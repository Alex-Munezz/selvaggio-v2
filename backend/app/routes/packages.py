from datetime import datetime

from flask import Blueprint, request

from app.extensions import db
from app.models import (
    Package,
    Destination,
    PackageItinerary,
    PackagePrice,
)


packages_bp = Blueprint(
    "packages",
    __name__,
    url_prefix="/api/packages",
)


def serialize_price(price):
    return {
        "id": price.id,
        "season_name": price.season_name,
        "start_date": price.start_date.isoformat(),
        "end_date": price.end_date.isoformat(),
        "currency": price.currency,
        "accommodation_level": price.accommodation_level,
        "price_1_pax": (
            float(price.price_1_pax)
            if price.price_1_pax is not None
            else None
        ),
        "price_2_pax": (
            float(price.price_2_pax)
            if price.price_2_pax is not None
            else None
        ),
        "price_3_pax": (
            float(price.price_3_pax)
            if price.price_3_pax is not None
            else None
        ),
        "price_4_pax": (
            float(price.price_4_pax)
            if price.price_4_pax is not None
            else None
        ),
        "price_5_pax": (
            float(price.price_5_pax)
            if price.price_5_pax is not None
            else None
        ),
        "price_6_pax": (
            float(price.price_6_pax)
            if price.price_6_pax is not None
            else None
        ),
        "child_price": 
        ( float(price.child_price) 
        if price.child_price is not None 
        else None
        ),
    }


def serialize_itinerary(item):
    return {
        "id": item.id,
        "day_number": item.day_number,
        "title": item.title,
        "description": item.description,
    }


def serialize_package(package):
    return {
        "id": package.id,
        "name": package.name,
        "slug": package.slug,
        "short_description": package.short_description,
        "description": package.description,
        "category": package.category,
        "duration_days": package.duration_days,
        "duration_nights": package.duration_nights,
        "price": (
            float(package.price)
            if package.price is not None
            else None
        ),
        "currency": package.currency,
        "image": package.image,
        "highlights": package.highlights,
        "inclusions": package.inclusions,
        "exclusions": package.exclusions,
        "optional_extras": package.optional_extras,
        "featured": package.featured,
        "active": package.active,

        "destinations": [
            {
                "id": destination.id,
                "name": destination.name,
                "slug": destination.slug,
            }
            for destination in package.destinations
        ],

        "itinerary": [
            serialize_itinerary(item)
            for item in package.itinerary
        ],

        "pricing": [
            serialize_price(price)
            for price in package.prices
        ],
    }


@packages_bp.route("", methods=["GET"])
def get_packages():
    packages = Package.query.order_by(
        Package.created_at.desc()
    ).all()

    return [
        serialize_package(package)
        for package in packages
    ], 200


@packages_bp.route("/<string:slug>", methods=["GET"])
def get_package(slug):
    package = Package.query.filter_by(
        slug=slug
    ).first_or_404()

    return serialize_package(package), 200


@packages_bp.route("", methods=["POST"])
def create_package():
    data = request.get_json() or {}

    # -----------------------------------
    # Required package fields
    # -----------------------------------

    required_fields = [
        "name",
        "slug",
        "duration_days",
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

    name = data["name"].strip()
    slug = data["slug"].strip().lower()

    existing_package = Package.query.filter_by(
        slug=slug
    ).first()

    if existing_package:
        return {
            "error": "A package with this slug already exists"
        }, 409

    # -----------------------------------
    # Duration
    # -----------------------------------

    try:
        duration_days = int(data["duration_days"])
    except (TypeError, ValueError):
        return {
            "error": "duration_days must be a valid number"
        }, 400

    if duration_days < 1:
        return {
            "error": "duration_days must be at least 1"
        }, 400

    duration_nights = data.get("duration_nights")

    if duration_nights is not None:
        try:
            duration_nights = int(duration_nights)
        except (TypeError, ValueError):
            return {
                "error": "duration_nights must be a valid number"
            }, 400

        if duration_nights < 0:
            return {
                "error": "duration_nights cannot be negative"
            }, 400

    # -----------------------------------
    # JSON list fields
    # -----------------------------------

    list_fields = [
        "highlights",
        "inclusions",
        "exclusions",
        "optional_extras",
    ]

    for field in list_fields:
        value = data.get(field, [])

        if not isinstance(value, list):
            return {
                "error": f"{field} must be a list"
            }, 400

    # -----------------------------------
    # Destinations
    # -----------------------------------

    destination_ids = data.get(
        "destination_ids",
        [],
    )

    if not isinstance(destination_ids, list):
        return {
            "error": "destination_ids must be a list"
        }, 400

    destinations = []

    if destination_ids:
        destinations = Destination.query.filter(
            Destination.id.in_(destination_ids)
        ).all()

        found_ids = {
            destination.id
            for destination in destinations
        }

        requested_ids = set(destination_ids)

        missing_ids = requested_ids - found_ids

        if missing_ids:
            return {
                "error": (
                    "One or more destinations "
                    "were not found"
                ),
                "destination_ids": list(missing_ids),
            }, 404

    # -----------------------------------
    # Itinerary validation
    # -----------------------------------

    itinerary_data = data.get(
        "itinerary",
        [],
    )

    if not isinstance(itinerary_data, list):
        return {
            "error": "itinerary must be a list"
        }, 400

    itinerary_items = []
    seen_days = set()

    for item in itinerary_data:
        if not isinstance(item, dict):
            return {
                "error": (
                    "Each itinerary item "
                    "must be an object"
                )
            }, 400

        if not item.get("day_number"):
            return {
                "error": (
                    "Each itinerary item requires "
                    "day_number"
                )
            }, 400

        if not item.get("title"):
            return {
                "error": (
                    "Each itinerary item requires "
                    "a title"
                )
            }, 400

        try:
            day_number = int(
                item["day_number"]
            )
        except (TypeError, ValueError):
            return {
                "error": (
                    "Itinerary day_number "
                    "must be a number"
                )
            }, 400

        if day_number < 1:
            return {
                "error": (
                    "Itinerary day_number "
                    "must be at least 1"
                )
            }, 400

        if day_number in seen_days:
            return {
                "error": (
                    f"Duplicate itinerary day: "
                    f"{day_number}"
                )
            }, 400

        seen_days.add(day_number)

        itinerary_items.append(
            {
                "day_number": day_number,
                "title": item["title"].strip(),
                "description": item.get(
                    "description"
                ),
            }
        )

    # -----------------------------------
    # Pricing validation
    # -----------------------------------

    pricing_data = data.get(
        "pricing",
        [],
    )

    if not isinstance(pricing_data, list):
        return {
            "error": "pricing must be a list"
        }, 400

    pricing_items = []

    for pricing in pricing_data:
        if not isinstance(pricing, dict):
            return {
                "error": (
                    "Each pricing item "
                    "must be an object"
                )
            }, 400

        start_date = None
        end_date = None
        
        if pricing.get("start_date"):
            try:
                start_date = datetime.strptime(
                    pricing["start_date"],
                    "%Y-%m-%d",
                ).date()
            except (ValueError, TypeError):
                return {
                    "error": "Pricing start_date must use YYYY-MM-DD format"
                }, 400
        
        if pricing.get("end_date"):
            try:
                end_date = datetime.strptime(
                    pricing["end_date"],
                    "%Y-%m-%d",
                ).date()
            except (ValueError, TypeError):
                return {
                    "error": "Pricing end_date must use YYYY-MM-DD format"
                }, 400

        if start_date and end_date and end_date < start_date:
            return {
                "error": "Pricing end_date cannot be before start_date"
            }, 400
        
        
        rate_fields = [
            "price_1_pax",
            "price_2_pax",
            "price_3_pax",
            "price_4_pax",
            "price_5_pax",
            "price_6_pax",
            "child_price",
        ]

        cleaned_rates = {}

        for rate_field in rate_fields:
            value = pricing.get(rate_field)

            if value is None:
                cleaned_rates[rate_field] = None
                continue

            try:
                value = float(value)
            except (TypeError, ValueError):
                return {
                    "error": (
                        f"{rate_field} must "
                        "be a valid number"
                    )
                }, 400

            if value < 0:
                return {
                    "error": (
                        f"{rate_field} cannot "
                        "be negative"
                    )
                }, 400

            cleaned_rates[rate_field] = value

        pricing_items.append(
            {
                "season_name": pricing.get(
                    "season_name"
                ),
                "start_date": start_date,
                "end_date": end_date,
                "currency": pricing.get(
                    "currency",
                    data.get(
                        "currency",
                        "USD",
                    ),
                ),
                "accommodation_level": pricing.get(
                    "accommodation_level",
                    "Mid-Range",
                ),
                **cleaned_rates,
            }
        )
    # -----------------------------------
    # Create package
    # -----------------------------------

    package = Package(
        name=name,
        slug=slug,
        short_description=data.get(
            "short_description"
        ),
        description=data.get(
            "description"
        ),
        category=data.get(
            "category"
        ),
        duration_days=duration_days,
        duration_nights=duration_nights,
        price=data.get(
            "price"
        ),
        currency=data.get(
            "currency",
            "USD",
        ),
        image=data.get(
            "image"
        ),
        highlights=data.get(
            "highlights",
            [],
        ),
        inclusions=data.get(
            "inclusions",
            [],
        ),
        exclusions=data.get(
            "exclusions",
            [],
        ),
        optional_extras=data.get(
            "optional_extras",
            [],
        ),
        featured=data.get(
            "featured",
            False,
        ),
        active=data.get(
            "active",
            True,
        ),
    )

    package.destinations = destinations

    # -----------------------------------
    # Save everything atomically
    # -----------------------------------

    try:
        db.session.add(package)

        # Flush gives us package.id
        # without committing yet.
        db.session.flush()

        for item in itinerary_items:
            itinerary = PackageItinerary(
                package_id=package.id,
                day_number=item["day_number"],
                title=item["title"],
                description=item["description"],
            )

            db.session.add(itinerary)

            for item in pricing_items:
             price = PackagePrice(
                package_id=package.id,
                season_name=item["season_name"],
                start_date=item["start_date"],
                end_date=item["end_date"],
                currency=item["currency"],
                accommodation_level=item["accommodation_level"],
                price_1_pax=item["price_1_pax"],
                price_2_pax=item["price_2_pax"],
                price_3_pax=item["price_3_pax"],
                price_4_pax=item["price_4_pax"],
                price_5_pax=item["price_5_pax"],
                price_6_pax=item["price_6_pax"],
                child_price=item["child_price"],
            )

            db.session.add(price)

        db.session.commit()

        return {
            "message": "Package created successfully",
            "id": package.id,
            "slug": package.slug,
        }, 201

    except Exception as e:
        db.session.rollback()

        return {
            "error": "Unable to create package",
            "details": str(e),
        }, 500

@packages_bp.route("/<string:slug>", methods=["PATCH"])
def update_package(slug):
    package = Package.query.filter_by(slug=slug).first_or_404()

    data = request.get_json() or {}

    # -----------------------------------
    # Basic package fields
    # -----------------------------------

    if "name" in data:
        package.name = data["name"].strip()

    if "slug" in data:
        new_slug = data["slug"].strip().lower()

        existing = Package.query.filter(
            Package.slug == new_slug,
            Package.id != package.id,
        ).first()

        if existing:
            return {
                "error": "A package with this slug already exists"
            }, 409

        package.slug = new_slug

    if "short_description" in data:
        package.short_description = data["short_description"]

    if "description" in data:
        package.description = data["description"]

    if "category" in data:
        package.category = data["category"]

    if "image" in data:
        package.image = data["image"]

    if "featured" in data:
        package.featured = bool(data["featured"])

    if "active" in data:
        package.active = bool(data["active"])

    # -----------------------------------
    # Duration
    # -----------------------------------

    if "duration_days" in data:
        try:
            duration_days = int(data["duration_days"])
        except (TypeError, ValueError):
            return {
                "error": "duration_days must be a valid number"
            }, 400

        if duration_days < 1:
            return {
                "error": "duration_days must be at least 1"
            }, 400

        package.duration_days = duration_days

    if "duration_nights" in data:
        try:
            duration_nights = int(data["duration_nights"])
        except (TypeError, ValueError):
            return {
                "error": "duration_nights must be a valid number"
            }, 400

        if duration_nights < 0:
            return {
                "error": "duration_nights cannot be negative"
            }, 400

        package.duration_nights = duration_nights

    # -----------------------------------
    # Pricing summary fields
    # -----------------------------------

    if "price" in data:
        try:
            package.price = (
                float(data["price"])
                if data["price"] is not None
                else None
            )
        except (TypeError, ValueError):
            return {
                "error": "price must be a valid number"
            }, 400

    if "currency" in data:
        package.currency = data["currency"]

    # -----------------------------------
    # JSON list fields
    # -----------------------------------

    list_fields = [
        "highlights",
        "inclusions",
        "exclusions",
        "optional_extras",
    ]

    for field in list_fields:
        if field in data:
            if not isinstance(data[field], list):
                return {
                    "error": f"{field} must be a list"
                }, 400

            setattr(package, field, data[field])

    # -----------------------------------
    # Destinations
    # -----------------------------------

    if "destination_ids" in data:
        destination_ids = data["destination_ids"]

        if not isinstance(destination_ids, list):
            return {
                "error": "destination_ids must be a list"
            }, 400

        destinations = []

        if destination_ids:
            destinations = Destination.query.filter(
                Destination.id.in_(destination_ids)
            ).all()

            found_ids = {
                destination.id
                for destination in destinations
            }

            requested_ids = set(destination_ids)

            missing_ids = requested_ids - found_ids

            if missing_ids:
                return {
                    "error": "One or more destinations were not found",
                    "destination_ids": list(missing_ids),
                }, 404

        package.destinations = destinations

    # -----------------------------------
    # Replace itinerary if supplied
    # -----------------------------------

    if "itinerary" in data:
        itinerary_data = data["itinerary"]

        if not isinstance(itinerary_data, list):
            return {
                "error": "itinerary must be a list"
            }, 400

        new_itinerary = []
        seen_days = set()

        for item in itinerary_data:
            if not isinstance(item, dict):
                return {
                    "error": "Each itinerary item must be an object"
                }, 400

            if not item.get("day_number"):
                return {
                    "error": "Each itinerary item requires day_number"
                }, 400

            if not item.get("title"):
                return {
                    "error": "Each itinerary item requires a title"
                }, 400

            try:
                day_number = int(item["day_number"])
            except (TypeError, ValueError):
                return {
                    "error": "day_number must be a number"
                }, 400

            if day_number < 1:
                return {
                    "error": "day_number must be at least 1"
                }, 400

            if day_number in seen_days:
                return {
                    "error": f"Duplicate itinerary day: {day_number}"
                }, 400

            seen_days.add(day_number)

            new_itinerary.append(
                PackageItinerary(
                    package_id=package.id,
                    day_number=day_number,
                    title=item["title"].strip(),
                    description=item.get("description"),
                )
            )

        # Because the relationship uses delete-orphan,
        # replacing this list removes the old itinerary.
        package.itinerary = new_itinerary

    # -----------------------------------
    # Replace pricing if supplied
    # -----------------------------------

    if "pricing" in data:
        pricing_data = data["pricing"]

        if not isinstance(pricing_data, list):
            return {
                "error": "pricing must be a list"
            }, 400

        new_prices = []

        rate_fields = [
            "price_1_pax",
            "price_2_pax",
            "price_3_pax",
            "price_4_pax",
            "price_5_pax",
            "price_6_pax",
            "child_price",
        ]

        for pricing in pricing_data:
            if not isinstance(pricing, dict):
                return {
                    "error": "Each pricing item must be an object"
                }, 400

            if not pricing.get("start_date"):
                return {
                    "error": "Each pricing item requires start_date"
                }, 400

            if not pricing.get("end_date"):
                return {
                    "error": "Each pricing item requires end_date"
                }, 400

            try:
                start_date = datetime.strptime(
                    pricing["start_date"],
                    "%Y-%m-%d",
                ).date()

                end_date = datetime.strptime(
                    pricing["end_date"],
                    "%Y-%m-%d",
                ).date()

            except (ValueError, TypeError):
                return {
                    "error": "Pricing dates must use YYYY-MM-DD"
                }, 400

            if end_date < start_date:
                return {
                    "error": "Pricing end_date cannot be before start_date"
                }, 400

            cleaned_rates = {}

            for field in rate_fields:
                value = pricing.get(field)

                if value is None:
                    cleaned_rates[field] = None
                    continue

                try:
                    value = float(value)
                except (TypeError, ValueError):
                    return {
                        "error": f"{field} must be a valid number"
                    }, 400

                if value < 0:
                    return {
                        "error": f"{field} cannot be negative"
                    }, 400

                cleaned_rates[field] = value

            new_prices.append(
                PackagePrice(
                    package_id=package.id,
                    season_name=pricing.get("season_name"),
                    start_date=start_date,
                    end_date=end_date,
                    currency=pricing.get(
                        "currency",
                        package.currency,
                    ),
                    accommodation_level=pricing.get(
                        "accommodation_level",
                        "Mid-Range",
                    ),
                    **cleaned_rates,
                )
            )

        package.prices = new_prices

    # -----------------------------------
    # Commit
    # -----------------------------------

    try:
        db.session.commit()

        return {
            "message": "Package updated successfully",
            "package": serialize_package(package),
        }, 200

    except Exception as e:
        db.session.rollback()

        return {
            "error": "Unable to update package",
            "details": str(e),
        }, 500