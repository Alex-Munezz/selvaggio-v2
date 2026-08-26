from datetime import datetime
from app.routes.admin_auth import ( staff_required )
from flask import Blueprint, request
from sqlalchemy import or_
from flask_cors import cross_origin
from app.extensions import db
from app.models import Booking, Package


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


# ---------------------------------------------------------
# SERIALIZERS
# ---------------------------------------------------------

def serialize_booking(booking):
    return {
        "id": booking.id,
        "reference": booking.reference,
        "customer": {
            "name": booking.customer_name,
            "email": booking.customer_email,
            "phone": booking.customer_phone,
        },
        "package": {
            "id": booking.package.id,
            "name": booking.package.name,
            "slug": booking.package.slug,
        } if booking.package else None,
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
        "adults": booking.adults,
        "children": booking.children,
        "guests": booking.guests,
        "special_requests": booking.special_requests,
        "total_amount": (
            float(booking.total_amount)
            if booking.total_amount is not None
            else None
        ),
        "currency": booking.currency,
        "status": booking.status,
        "payment_status": booking.payment_status,
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


# ---------------------------------------------------------
# PRICING
# ---------------------------------------------------------

def calculate_package_price(
    package,
    travel_date,
    adults,
    children,
):
    if adults < 1 or adults > 6:
        return (
            None,
            "Adult pricing is only available for 1 to 6 adults",
        )

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

    adult_rate_field = f"price_{adults}_pax"

    adult_rate = getattr(
        matching_price,
        adult_rate_field,
        None,
    )

    if adult_rate is None:
        return (
            None,
            f"No adult price is available for {adults} adult(s)",
        )

    child_total = 0

    if children > 0:
        if matching_price.child_price is None:
            return (
                None,
                "Child pricing is not available for this package",
            )

        child_total = (
            matching_price.child_price * children
        )

    total_amount = adult_rate + child_total

    return {
        "amount": total_amount,
        "currency": matching_price.currency,
        "pricing_id": matching_price.id,
        "season_name": matching_price.season_name,
        "accommodation_level": (
            matching_price.accommodation_level
        ),
        "adult_rate": adult_rate,
        "child_rate": matching_price.child_price,
        "children": children,
    }, None


# =========================================================
# CUSTOMER BOOKING ROUTES
# =========================================================


# ---------------------------------------------------------
# GET SINGLE BOOKING
# ---------------------------------------------------------

@bookings_bp.route(
    "/<reference>",
    methods=["GET"],
)
def get_booking(reference):
    booking = Booking.query.filter_by(
        reference=reference
    ).first()

    if not booking:
        return {
            "error": "Booking not found"
        }, 404

    return serialize_booking(booking), 200


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
            "error": "Missing required fields",
            "fields": missing_fields,
        }, 400

    adults = data.get("adults", 1)
    children = data.get("children", 0)

    try:
        adults = int(adults)
        children = int(children)

    except (TypeError, ValueError):
        return {
            "error":
                "Adults and children must be valid numbers"
        }, 400

    if adults < 1:
        return {
            "error": "At least 1 adult is required"
        }, 400

    if children < 0:
        return {
            "error": "Children cannot be negative"
        }, 400

    guests = adults + children

    package = db.session.get(
        Package,
        data["package_id"],
    )

    if not package:
        return {
            "error": "Package not found"
        }, 404

    if not package.active:
        return {
            "error":
                "This package is currently unavailable"
        }, 400

    try:
        travel_date = datetime.strptime(
            data["travel_date"],
            "%Y-%m-%d",
        ).date()

    except (ValueError, TypeError):
        return {
            "error":
                "travel_date must use YYYY-MM-DD format"
        }, 400

    return_date = None

    if data.get("return_date"):
        try:
            return_date = datetime.strptime(
                data["return_date"],
                "%Y-%m-%d",
            ).date()

        except (ValueError, TypeError):
            return {
                "error":
                    "return_date must use YYYY-MM-DD format"
            }, 400

        if return_date < travel_date:
            return {
                "error":
                    "return_date cannot be before travel_date"
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
            "error": pricing_error
        }, 400

    booking = Booking(
        customer_name=(
            data["customer_name"].strip()
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
        travel_date=travel_date,
        return_date=return_date,
        adults=adults,
        children=children,
        guests=guests,
        special_requests=data.get(
            "special_requests"
        ),
        total_amount=pricing_result[
            "amount"
        ],
        currency=pricing_result[
            "currency"
        ],
        status="pending",
        payment_status="unpaid",
    )

    try:
        db.session.add(booking)
        db.session.commit()

        return {
            "message":
                "Booking created successfully",
            "reference":
                booking.reference,
            "id":
                booking.id,
            "package":
                package.name,
            "travel_date":
                travel_date.isoformat(),
            "adults":
                adults,
            "children":
                children,
            "guests":
                guests,
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
                "children_total": (
                    float(
                        pricing_result[
                            "child_rate"
                        ]
                        * children
                    )
                    if pricing_result[
                        "child_rate"
                    ] is not None
                    else 0
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
# PREVIEW BOOKING PRICE
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

    except (TypeError, ValueError):
        return {
            "error":
                "Adults and children must be valid numbers"
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
                "This package is currently unavailable"
        }, 400

    try:
        travel_date = datetime.strptime(
            data["travel_date"],
            "%Y-%m-%d",
        ).date()

    except (ValueError, TypeError):
        return {
            "error":
                "travel_date must use YYYY-MM-DD format"
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

    child_rate = pricing_result[
        "child_rate"
    ]

    return {
        "package_id":
            package.id,
        "package":
            package.name,
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
            "child_rate": (
                float(child_rate)
                if child_rate is not None
                else None
            ),
            "children_total": (
                float(
                    child_rate * children
                )
                if child_rate is not None
                else 0
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
# CONSULTANT / ADMIN BOOKING ROUTES
# =========================================================


# ---------------------------------------------------------
# GET ALL BOOKINGS
#
# Optional query parameters:
#
# ?status=pending
# ?payment_status=unpaid
# ?search=SEL-ABC
# ?travel_from=2026-09-01
# ?travel_to=2026-09-30
#
# ---------------------------------------------------------

@admin_bookings_bp.route(
    "",
    methods=["GET"],
)
@staff_required
def admin_get_bookings():
    query = Booking.query

    booking_status = request.args.get(
        "status"
    )

    payment_status = request.args.get(
        "payment_status"
    )

    search = request.args.get(
        "search",
        "",
    ).strip()

    travel_from = request.args.get(
        "travel_from"
    )

    travel_to = request.args.get(
        "travel_to"
    )

    # -------------------------
    # Booking status filter
    # -------------------------

    if booking_status:
        query = query.filter(
            Booking.status
            == booking_status
        )

    # -------------------------
    # Payment status filter
    # -------------------------

    if payment_status:
        query = query.filter(
            Booking.payment_status
            == payment_status
        )

    # -------------------------
    # Search
    # -------------------------

    if search:
        search_term = f"%{search}%"

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

    # -------------------------
    # Travel date from
    # -------------------------

    if travel_from:
        try:
            parsed_from = datetime.strptime(
                travel_from,
                "%Y-%m-%d",
            ).date()

        except ValueError:
            return {
                "error":
                    "travel_from must use YYYY-MM-DD format"
            }, 400

        query = query.filter(
            Booking.travel_date
            >= parsed_from
        )

    # -------------------------
    # Travel date to
    # -------------------------

    if travel_to:
        try:
            parsed_to = datetime.strptime(
                travel_to,
                "%Y-%m-%d",
            ).date()

        except ValueError:
            return {
                "error":
                    "travel_to must use YYYY-MM-DD format"
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
        "count": len(bookings),
        "bookings": [
            serialize_booking(booking)
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
    booking = Booking.query.filter_by(
        reference=reference
    ).first()

    if not booking:
        return {
            "error":
                "Booking not found"
        }, 404

    return {
        "booking":
            serialize_booking(booking)
    }, 200


# ---------------------------------------------------------
# UPDATE BOOKING STATUS
# ---------------------------------------------------------

@admin_bookings_bp.route(
    "/<reference>/status",
    methods=["PATCH"],
)
@staff_required
def admin_update_booking_status(
    reference,
):
    booking = Booking.query.filter_by(
        reference=reference
    ).first()

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

    if new_status not in valid_statuses:
        return {
            "error":
                "Invalid booking status",
            "allowed_statuses":
                sorted(valid_statuses),
        }, 400

    previous_status = booking.status

    booking.status = new_status

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
                "Unable to update booking status"
        }, 500

    return {
        "message":
            "Booking status updated successfully",
        "reference":
            booking.reference,
        "previous_status":
            previous_status,
        "status":
            booking.status,
        "booking":
            serialize_booking(booking),
    }, 200