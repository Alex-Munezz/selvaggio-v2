from datetime import datetime
from decimal import Decimal, InvalidOperation

from flask import Blueprint, request
from sqlalchemy import or_

from app.extensions import db
from app.models import (
    Booking,
    Package,
    ServeSafariBookingDetail,
    Payment,
)
from app.routes.admin_auth import (
    staff_required,
)
from flask_jwt_extended import get_jwt
from flask import current_app
from app.services.booking_email import (
    send_booking_notification,
)

bookings_bp = Blueprint(
    "bookings",
    __name__,
    url_prefix="/api/bookings",
)

admin_bookings_bp = Blueprint(
    "admin_bookings",
    __name__,
    url_prefix="/api/admin/bookings",
)


# =========================================================
# HELPERS
# =========================================================


def parse_date(value, field_name):
    if not value:
        return None, None

    try:
        return (
            datetime.strptime(
                value,
                "%Y-%m-%d",
            ).date(),
            None,
        )

    except (TypeError, ValueError):
        return (
            None,
            (
                f"{field_name} must use "
                "YYYY-MM-DD format"
            ),
        )


def parse_time(value, field_name):
    if not value:
        return None, None

    try:
        return (
            datetime.strptime(
                value,
                "%H:%M",
            ).time(),
            None,
        )

    except (TypeError, ValueError):
        return (
            None,
            (
                f"{field_name} must use "
                "HH:MM format"
            ),
        )


def is_serve_safari_package(package):
    return (
        package
        and package.category
        == "serve-and-safari"
    )


# =========================================================
# SERIALIZERS
# =========================================================


def serialize_serve_safari_detail(
    detail,
):
    if not detail:
        return None

    return {
        "organisation_name":
            detail.organisation_name,

        "organisation_type":
            detail.organisation_type,

        "mission_location":
            detail.mission_location,

        "mission_start_date": (
            detail.mission_start_date.isoformat()
            if detail.mission_start_date
            else None
        ),

        "mission_end_date": (
            detail.mission_end_date.isoformat()
            if detail.mission_end_date
            else None
        ),

        "arrival_flight_number":
            detail.arrival_flight_number,

        "arrival_date": (
            detail.arrival_date.isoformat()
            if detail.arrival_date
            else None
        ),

        "arrival_time": (
            detail.arrival_time.strftime(
                "%H:%M"
            )
            if detail.arrival_time
            else None
        ),

        "departure_flight_number":
            detail.departure_flight_number,

        "departure_date": (
            detail.departure_date.isoformat()
            if detail.departure_date
            else None
        ),

        "departure_time": (
            detail.departure_time.strftime(
                "%H:%M"
            )
            if detail.departure_time
            else None
        ),

        "service_needs":
            detail.service_needs or [],

        "transport_notes":
            detail.transport_notes,

        "extra_details":
            detail.extra_details or {},
    }


def serialize_booking(booking):
    package = booking.package

    quote_required = bool(
        package
        and package.pricing_mode
        == "quote"
        and booking.total_amount
        is None
    )

    booking_type = (
        "serve-and-safari"
        if is_serve_safari_package(
            package
        )
        else "regular-safari"
    )

    return {
        "id": booking.id,
        "reference":
            booking.reference,

        "booking_type":
            booking_type,

        "quote_required":
            quote_required,

        "customer": {
            "name":
                booking.customer_name,

            "email":
                booking.customer_email,

            "phone":
                booking.customer_phone,
        },

        "package": {
            "id":
                package.id,

            "name":
                package.name,

            "slug":
                package.slug,

            "category":
                package.category,

            "pricing_mode":
                package.pricing_mode,
        } if package else None,

        "travel_date": (
            booking.travel_date.isoformat()
            if booking.travel_date
            else None
        ),

        "return_date": (
            booking.return_date.isoformat()
            if booking.return_date
            else None
        ),

        "adults":
            booking.adults,

        "children":
            booking.children,

        "guests":
            booking.guests,

        "special_requests":
            booking.special_requests,

        "total_amount": (
            float(
                booking.total_amount
            )
            if booking.total_amount
            is not None
            else None
        ),

        "currency":
            booking.currency,

        "status":
            booking.status,

        "payment_status":
            booking.payment_status,

        "serve_safari": (
            serialize_serve_safari_detail(
                booking.serve_safari_detail
            )
        ),

        "created_at": (
            booking.created_at.isoformat()
            if booking.created_at
            else None
        ),

        "updated_at": (
            booking.updated_at.isoformat()
            if booking.updated_at
            else None
        ),
    }


# =========================================================
# PRICING
# =========================================================


def calculate_package_price(
    package,
    travel_date,
    adults,
    children,
):
    if package.pricing_mode == "quote":
        return {
            "quote_required": True,
            "amount": None,
            "currency": package.currency,
        }, None

    if adults < 1:
        return None, "At least one adult is required"

    if children < 0:
        return None, "children cannot be negative"

    matching_price = None

    for price in package.prices:
        if (
            price.start_date is None
            and price.end_date is None
        ):
            matching_price = price
            break

        if (
            price.start_date
            and price.end_date
            and price.start_date
            <= travel_date
            <= price.end_date
        ):
            matching_price = price
            break

    if not matching_price:
        return (
            None,
            "No pricing is available for the selected travel date",
        )

    is_day_trip = (
        package.duration_days == 1
        or package.category == "day-trip"
    )

    if is_day_trip:
        party_size = adults + children

        if party_size < 1 or party_size > 8:
            return (
                None,
                "Day-trip pricing is available for 1 to 8 travellers",
            )

        rate_field = f"price_{party_size}_pax"

        person_rate = getattr(
            matching_price,
            rate_field,
            None,
        )

        if person_rate is None:
            return (
                None,
                (
                    "No day-trip price is available for "
                    f"{party_size} traveller(s)"
                ),
            )

        adult_total = person_rate * adults
        children_total = person_rate * children
        total_amount = adult_total + children_total

        return {
            "quote_required": False,
            "amount": total_amount,
            "currency": matching_price.currency,
            "pricing_id": matching_price.id,
            "season_name": matching_price.season_name,
            "accommodation_level": (
                matching_price.accommodation_level
            ),
            "adult_rate": person_rate,
            "adult_total": adult_total,
            "child_rate": person_rate,
            "children_total": children_total,
            "adults": adults,
            "children": children,
        }, None

    if adults > 6:
        return (
            None,
            "Adult pricing is only available for 1 to 6 adults",
        )

    rate_field = f"price_{adults}_pax"

    adult_rate = getattr(
        matching_price,
        rate_field,
        None,
    )

    if adult_rate is None:
        return (
            None,
            (
                "No adult price is available for "
                f"{adults} adult(s)"
            ),
        )

    adult_total = adult_rate * adults
    children_total = 0

    if children > 0:
        if matching_price.child_price is None:
            return (
                None,
                "Child pricing is not available for this package",
            )

        children_total = (
            matching_price.child_price
            * children
        )

    total_amount = adult_total + children_total

    return {
        "quote_required": False,
        "amount": total_amount,
        "currency": matching_price.currency,
        "pricing_id": matching_price.id,
        "season_name": matching_price.season_name,
        "accommodation_level": (
            matching_price.accommodation_level
        ),
        "adult_rate": adult_rate,
        "adult_total": adult_total,
        "child_rate": matching_price.child_price,
        "children_total": children_total,
        "adults": adults,
        "children": children,
    }, None


# =========================================================
# SERVE & SAFARI VALIDATION
# =========================================================


def prepare_serve_safari_details(
    data,
):
    detail_data = (
        data.get(
            "serve_safari",
            {}
        )
        or {}
    )

    if not isinstance(
        detail_data,
        dict,
    ):
        return (
            None,
            (
                "serve_safari must "
                "be an object"
            ),
        )

    required = [
        "organisation_name",
        "mission_location",
    ]

    missing = [
        field
        for field in required
        if not detail_data.get(field)
    ]

    if missing:
        return (
            None,
            (
                "Missing Serve & Safari "
                "fields: "
                + ", ".join(missing)
            ),
        )

    service_needs = (
        detail_data.get(
            "service_needs",
            [],
        )
    )

    if not isinstance(
        service_needs,
        list,
    ):
        return (
            None,
            (
                "service_needs must "
                "be a list"
            ),
        )

    extra_details = (
        detail_data.get(
            "extra_details",
            {},
        )
    )

    if not isinstance(
        extra_details,
        dict,
    ):
        return (
            None,
            (
                "extra_details must "
                "be an object"
            ),
        )

    mission_start_date, error = (
        parse_date(
            detail_data.get(
                "mission_start_date"
            ),
            "mission_start_date",
        )
    )

    if error:
        return None, error

    mission_end_date, error = (
        parse_date(
            detail_data.get(
                "mission_end_date"
            ),
            "mission_end_date",
        )
    )

    if error:
        return None, error

    if (
        mission_start_date
        and mission_end_date
        and mission_end_date
        < mission_start_date
    ):
        return (
            None,
            (
                "mission_end_date cannot "
                "be before mission_start_date"
            ),
        )

    arrival_date, error = (
        parse_date(
            detail_data.get(
                "arrival_date"
            ),
            "arrival_date",
        )
    )

    if error:
        return None, error

    departure_date, error = (
        parse_date(
            detail_data.get(
                "departure_date"
            ),
            "departure_date",
        )
    )

    if error:
        return None, error

    if (
        arrival_date
        and departure_date
        and departure_date
        < arrival_date
    ):
        return (
            None,
            (
                "departure_date cannot "
                "be before arrival_date"
            ),
        )

    arrival_time, error = (
        parse_time(
            detail_data.get(
                "arrival_time"
            ),
            "arrival_time",
        )
    )

    if error:
        return None, error

    departure_time, error = (
        parse_time(
            detail_data.get(
                "departure_time"
            ),
            "departure_time",
        )
    )

    if error:
        return None, error

    return {
        "organisation_name":
            detail_data[
                "organisation_name"
            ].strip(),

        "organisation_type":
            detail_data.get(
                "organisation_type"
            ),

        "mission_location":
            detail_data[
                "mission_location"
            ].strip(),

        "mission_start_date":
            mission_start_date,

        "mission_end_date":
            mission_end_date,

        "arrival_flight_number":
            detail_data.get(
                "arrival_flight_number"
            ),

        "arrival_date":
            arrival_date,

        "arrival_time":
            arrival_time,

        "departure_flight_number":
            detail_data.get(
                "departure_flight_number"
            ),

        "departure_date":
            departure_date,

        "departure_time":
            departure_time,

        "service_needs":
            service_needs,

        "transport_notes":
            detail_data.get(
                "transport_notes"
            ),

        "extra_details":
            extra_details,
    }, None


# =========================================================
# CUSTOMER ROUTES
# =========================================================


@bookings_bp.route(
    "/<reference>",
    methods=["GET"],
)
def get_booking(reference):
    booking = (
        Booking.query
        .filter_by(
            reference=reference
        )
        .first()
    )

    if not booking:
        return {
            "error":
                "Booking not found"
        }, 404

    return (
        serialize_booking(
            booking
        ),
        200,
    )


# ---------------------------------------------------------
# CREATE BOOKING
# ---------------------------------------------------------


@bookings_bp.route(
    "",
    methods=["POST"],
)
def create_booking():
    data = request.get_json() or {}

    required_fields = [
        "customer_name",
        "customer_email",
        "package_id",
        "travel_date",
    ]

    missing_fields = [
        field
        for field in required_fields
        if not data.get(field)
    ]

    if missing_fields:
        return {
            "error":
                "Missing required fields",
            "fields":
                missing_fields,
        }, 400

    try:
        adults = int(
            data.get(
                "adults",
                1,
            )
        )

        children = int(
            data.get(
                "children",
                0,
            )
        )

    except (
        TypeError,
        ValueError,
    ):
        return {
            "error":
                (
                    "Adults and children "
                    "must be valid numbers"
                )
        }, 400

    if adults < 1:
        return {
            "error":
                "At least 1 adult is required"
        }, 400

    if children < 0:
        return {
            "error":
                "Children cannot be negative"
        }, 400

    guests = (
        adults
        + children
    )

    package = db.session.get(
        Package,
        data["package_id"],
    )

    if not package:
        return {
            "error":
                "Package not found"
        }, 404

    if not package.active:
        return {
            "error":
                (
                    "This package is "
                    "currently unavailable"
                )
        }, 400

    travel_date, error = (
        parse_date(
            data["travel_date"],
            "travel_date",
        )
    )

    if error:
        return {
            "error": error
        }, 400

    return_date, error = (
        parse_date(
            data.get(
                "return_date"
            ),
            "return_date",
        )
    )

    if error:
        return {
            "error": error
        }, 400

    if (
        return_date
        and return_date
        < travel_date
    ):
        return {
            "error":
                (
                    "return_date cannot be "
                    "before travel_date"
                )
        }, 400

    serve_safari_data = None

    if is_serve_safari_package(
        package
    ):
        (
            serve_safari_data,
            serve_error,
        ) = (
            prepare_serve_safari_details(
                data
            )
        )

        if serve_error:
            return {
                "error":
                    serve_error
            }, 400

    pricing_result, pricing_error = (
        calculate_package_price(
            package,
            travel_date,
            adults,
            children,
        )
    )

    if pricing_error:
        return {
            "error":
                pricing_error
        }, 400

    quote_required = (
        package.pricing_mode
        == "quote"
    )

    booking = Booking(
        customer_name=(
            data["customer_name"]
            .strip()
        ),

        customer_email=(
            data["customer_email"]
            .strip()
            .lower()
        ),

        customer_phone=data.get(
            "customer_phone"
        ),

        package=package,

        travel_date=
            travel_date,

        return_date=
            return_date,

        adults=
            adults,

        children=
            children,

        guests=
            guests,

        special_requests=data.get(
            "special_requests"
        ),

        total_amount=(
            None
            if quote_required
            else pricing_result[
                "amount"
            ]
        ),

        currency=(
            package.currency
            if quote_required
            else pricing_result[
                "currency"
            ]
        ),

        status="pending",

        payment_status="unpaid",
    )

    try:
        db.session.add(
            booking
        )

        db.session.flush()

        if serve_safari_data:
            detail = (
                ServeSafariBookingDetail(
                    booking_id=
                        booking.id,

                    **serve_safari_data,
                )
            )

            db.session.add(
                detail
            )

        db.session.commit()

        try:
            send_booking_notification(
                booking
            )
        
        except Exception as email_error:
            print(
                "Booking email notification error:",
                email_error,
            )
        
        
        return {
            "message":
                (
                    "Booking created "
                    "successfully"
                ),

            "reference":
                booking.reference,

            "id":
                booking.id,

            "package":
                package.name,

            "booking_type": (
                "serve-and-safari"
                if is_serve_safari_package(
                    package
                )
                else "regular-safari"
            ),

            "pricing_mode":
                package.pricing_mode,

            "quote_required":
                quote_required,

            "travel_date":
                travel_date.isoformat(),

            "adults":
                adults,

            "children":
                children,

            "guests":
                guests,

            "pricing": (
                None
                if quote_required
                else {
                    "season_name":
                        pricing_result[
                            "season_name"
                        ],

                    "accommodation_level":
                        pricing_result[
                            "accommodation_level"
                        ],

                    "adult_rate":
                        float(
                            pricing_result[
                                "adult_rate"
                            ]
                        ),

                    "adult_total":
                        float(
                            pricing_result[
                                "adult_total"
                            ]
                        ),

                    "child_rate": (
                        float(
                            pricing_result[
                                "child_rate"
                            ]
                        )
                        if pricing_result[
                            "child_rate"
                        ] is not None
                        else None
                    ),

                    "children_total":
                        float(
                            pricing_result[
                                "children_total"
                            ]
                        ),

                    "total_amount":
                        float(
                            pricing_result[
                                "amount"
                            ]
                        ),

                    "currency":
                        pricing_result[
                            "currency"
                        ],
                }
            ),
        }, 201

    except Exception as error:
        db.session.rollback()

        print(
            "Booking creation error:",
            error,
        )

        return {
            "error":
                "Unable to create booking"
        }, 500


# ---------------------------------------------------------
# PREVIEW PRICE
# ---------------------------------------------------------


@bookings_bp.route(
    "/preview-price",
    methods=["POST"],
)
def preview_booking_price():
    data = request.get_json() or {}

    required_fields = [
        "package_id",
        "travel_date",
        "adults",
    ]

    missing_fields = [
        field
        for field in required_fields
        if data.get(field) is None
    ]

    if missing_fields:
        return {
            "error":
                "Missing required fields",
            "fields":
                missing_fields,
        }, 400

    try:
        adults = int(
            data.get(
                "adults",
                1,
            )
        )

        children = int(
            data.get(
                "children",
                0,
            )
        )

    except (
        TypeError,
        ValueError,
    ):
        return {
            "error":
                (
                    "Adults and children "
                    "must be valid numbers"
                )
        }, 400

    if adults < 1:
        return {
            "error":
                "At least 1 adult is required"
        }, 400

    if children < 0:
        return {
            "error":
                "Children cannot be negative"
        }, 400

    package = db.session.get(
        Package,
        data["package_id"],
    )

    if not package:
        return {
            "error":
                "Package not found"
        }, 404

    if not package.active:
        return {
            "error":
                (
                    "This package is "
                    "currently unavailable"
                )
        }, 400

    travel_date, error = (
        parse_date(
            data["travel_date"],
            "travel_date",
        )
    )

    if error:
        return {
            "error": error
        }, 400

    if (
        package.pricing_mode
        == "quote"
    ):
        return {
            "package_id":
                package.id,

            "package":
                package.name,

            "pricing_mode":
                "quote",

            "quote_required":
                True,

            "travel_date":
                travel_date.isoformat(),

            "adults":
                adults,

            "children":
                children,

            "guests":
                adults + children,

            "pricing":
                None,

            "message":
                (
                    "This package requires "
                    "a custom quote."
                ),
        }, 200

    pricing_result, pricing_error = (
        calculate_package_price(
            package,
            travel_date,
            adults,
            children,
        )
    )

    if pricing_error:
        return {
            "error":
                pricing_error
        }, 400

    child_rate = (
        pricing_result[
            "child_rate"
        ]
    )

    return {
        "package_id":
            package.id,

        "package":
            package.name,

        "pricing_mode":
            "fixed",

        "quote_required":
            False,

        "travel_date":
            travel_date.isoformat(),

        "adults":
            adults,

        "children":
            children,

        "guests":
            adults + children,

        "pricing": {
            "season_name":
                pricing_result[
                    "season_name"
                ],

            "accommodation_level":
                pricing_result[
                    "accommodation_level"
                ],

            "adult_rate":
                float(
                    pricing_result[
                        "adult_rate"
                    ]
                ),

            "adult_total":
                float(
                    pricing_result[
                        "adult_total"
                    ]
                ),

            "child_rate": (
                float(
                    child_rate
                )
                if child_rate
                is not None
                else None
            ),

            "children_total":
                float(
                    pricing_result[
                        "children_total"
                    ]
                ),

            "total_amount":
                float(
                    pricing_result[
                        "amount"
                    ]
                ),

            "currency":
                pricing_result[
                    "currency"
                ],
        },
    }, 200


# =========================================================
# ADMIN / CONSULTANT ROUTES
# =========================================================


@admin_bookings_bp.route(
    "",
    methods=["GET"],
)
@staff_required
def admin_get_bookings():
    query = Booking.query

    booking_status = (
        request.args.get(
            "status"
        )
    )

    payment_status = (
        request.args.get(
            "payment_status"
        )
    )

    category = request.args.get(
        "category"
    )

    search = (
        request.args.get(
            "search",
            "",
        )
        .strip()
    )

    travel_from = (
        request.args.get(
            "travel_from"
        )
    )

    travel_to = (
        request.args.get(
            "travel_to"
        )
    )

    if booking_status:
        query = query.filter(
            Booking.status
            == booking_status
        )

    if payment_status:
        query = query.filter(
            Booking.payment_status
            == payment_status
        )

    if category:
        query = (
            query
            .join(
                Package,
                Booking.package_id
                == Package.id,
            )
            .filter(
                Package.category
                == category
            )
        )

    if search:
        search_term = (
            f"%{search}%"
        )

        query = query.filter(
            or_(
                Booking.reference.ilike(
                    search_term
                ),

                Booking.customer_name.ilike(
                    search_term
                ),

                Booking.customer_email.ilike(
                    search_term
                ),

                Booking.customer_phone.ilike(
                    search_term
                ),
            )
        )

    if travel_from:
        (
            parsed_from,
            error,
        ) = parse_date(
            travel_from,
            "travel_from",
        )

        if error:
            return {
                "error": error
            }, 400

        query = query.filter(
            Booking.travel_date
            >= parsed_from
        )

    if travel_to:
        (
            parsed_to,
            error,
        ) = parse_date(
            travel_to,
            "travel_to",
        )

        if error:
            return {
                "error": error
            }, 400

        query = query.filter(
            Booking.travel_date
            <= parsed_to
        )

    bookings = (
        query
        .order_by(
            Booking.created_at.desc()
        )
        .all()
    )

    return {
        "count":
            len(bookings),

        "bookings": [
            serialize_booking(
                booking
            )
            for booking in bookings
        ],
    }, 200


# ---------------------------------------------------------
# GET ONE BOOKING
# ---------------------------------------------------------


@admin_bookings_bp.route(
    "/<reference>",
    methods=["GET"],
)
@staff_required
def admin_get_booking(reference):
    booking = (
        Booking.query
        .filter_by(
            reference=reference
        )
        .first()
    )

    if not booking:
        return {
            "error":
                "Booking not found"
        }, 404

    return {
        "booking":
            serialize_booking(
                booking
            )
    }, 200


# ---------------------------------------------------------
# UPDATE STATUS
# ---------------------------------------------------------


@admin_bookings_bp.route(
    "/<reference>/status",
    methods=["PATCH"],
)
@staff_required
def admin_update_booking_status(
    reference,
):
    booking = (
        Booking.query
        .filter_by(
            reference=reference
        )
        .first()
    )

    if not booking:
        return {
            "error":
                "Booking not found"
        }, 404

    data = request.get_json() or {}

    new_status = data.get(
        "status"
    )

    if not new_status:
        return {
            "error":
                "status is required"
        }, 400

    valid_statuses = {
        "pending",
        "contacted",
        "confirmed",
        "completed",
        "cancelled",
    }

    if (
        new_status
        not in valid_statuses
    ):
        return {
            "error":
                "Invalid booking status",

            "allowed_statuses":
                sorted(
                    valid_statuses
                ),
        }, 400

    previous_status = (
        booking.status
    )

    booking.status = (
        new_status
    )

    try:
        db.session.commit()

    except Exception as error:
        db.session.rollback()

        print(
            "Booking status update error:",
            error,
        )

        return {
            "error":
                (
                    "Unable to update "
                    "booking status"
                )
        }, 500

    return {
        "message":
            (
                "Booking status updated "
                "successfully"
            ),

        "reference":
            booking.reference,

        "previous_status":
            previous_status,

        "status":
            booking.status,

        "booking":
            serialize_booking(
                booking
            ),
    }, 200


# ---------------------------------------------------------
# SET / UPDATE CUSTOM QUOTE
# ---------------------------------------------------------


@admin_bookings_bp.route(
    "/<reference>/quote",
    methods=["PATCH"],
)
@staff_required
def admin_update_booking_quote(
    reference,
):
    booking = (
        Booking.query
        .filter_by(
            reference=reference
        )
        .first()
    )

    if not booking:
        return {
            "error":
                "Booking not found"
        }, 404

    if not booking.package:
        return {
            "error":
                "Booking package not found"
        }, 400

    if (
        booking.package.pricing_mode
        != "quote"
    ):
        return {
            "error":
                (
                    "This booking does not "
                    "use custom quote pricing"
                )
        }, 400

    if booking.payment_status in {
        "partial",
        "paid",
    }:
        return {
            "error":
                (
                    "Cannot change the quote "
                    "after payment has started"
                )
        }, 400

    data = request.get_json() or {}

    amount = data.get(
        "amount"
    )

    if amount is None:
        return {
            "error":
                "amount is required"
        }, 400

    try:
        amount = Decimal(
            str(amount)
        )

    except (
        InvalidOperation,
        TypeError,
        ValueError,
    ):
        return {
            "error":
                "amount must be a valid number"
        }, 400

    if amount <= 0:
        return {
            "error":
                "amount must be greater than 0"
        }, 400

    currency = (
        str(
            data.get(
                "currency",
                booking.currency
                or "USD",
            )
        )
        .strip()
        .upper()
    )

    if not currency:
        return {
            "error":
                "currency is required"
        }, 400

    booking.total_amount = (
        amount
    )

    booking.currency = (
        currency
    )

    try:
        db.session.commit()

    except Exception as error:
        db.session.rollback()

        print(
            "Quote update error:",
            error,
        )

        return {
            "error":
                (
                    "Unable to update "
                    "booking quote"
                )
        }, 500

    return {
        "message":
            (
                "Booking quote updated "
                "successfully"
            ),

        "booking":
            serialize_booking(
                booking
            ),
    }, 200

# ---------------------------------------------------------
# PERMANENTLY DELETE BOOKING
# ---------------------------------------------------------


@admin_bookings_bp.route(
    "/<reference>",
    methods=["DELETE"],
)
@staff_required
def admin_delete_booking(reference):
    claims = get_jwt()

    role = str(
        claims.get("role", "")
    ).strip().lower()

    privileged_roles = {
        "admin",
        "super_admin",
        "super-admin",
    }

    if role not in privileged_roles:
        return {
            "error":
                "Only an administrator can permanently delete bookings"
        }, 403

    booking = (
        Booking.query
        .filter_by(
            reference=reference
        )
        .first()
    )

    if not booking:
        return {
            "error":
                "Booking not found"
        }, 404

    data = (
        request.get_json(
            silent=True
        )
        or {}
    )

    if (
        data.get("confirmation")
        != "DELETE"
    ):
        return {
            "error":
                "Type DELETE to confirm permanent deletion"
        }, 400

    force_test_delete = bool(
        data.get(
            "force_test_delete",
            False,
        )
    )

    # Never allow force deletion in production
    is_development = (
        current_app.debug
        or current_app.config.get(
            "ENV"
        ) == "development"
    )

    if (
        booking.payment_status
        in {"partial", "paid"}
        and not (
            force_test_delete
            and is_development
        )
    ):
        return {
            "error":
                (
                    "Bookings with payments cannot "
                    "be permanently deleted."
                )
        }, 409

    existing_payments = (
        Payment.query
        .filter_by(
            booking_id=booking.id
        )
        .all()
    )

    if (
        existing_payments
        and not (
            force_test_delete
            and is_development
        )
    ):
        return {
            "error":
                (
                    "This booking has payment "
                    "history and cannot be deleted."
                )
        }, 409

    try:
        # DEV ONLY:
        # Remove fake/test payment records
        if (
            force_test_delete
            and is_development
        ):
            for payment in existing_payments:
                db.session.delete(
                    payment
                )

        deleted_reference = (
            booking.reference
        )

        db.session.delete(
            booking
        )

        db.session.commit()

    except Exception as error:
        db.session.rollback()

        print(
            "Booking deletion error:",
            error,
        )

        return {
            "error":
                "Unable to permanently delete booking"
        }, 500

    return {
        "message":
            "Booking permanently deleted successfully",

        "reference":
            deleted_reference,

        "test_delete":
            force_test_delete,
    }, 200