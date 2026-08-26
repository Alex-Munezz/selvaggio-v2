from flask import Blueprint, request

from app.extensions import db
from app.models import Destination


destinations_bp = Blueprint(
    "destinations",
    __name__,
    url_prefix="/api/destinations",
)


@destinations_bp.route("", methods=["GET"])
def get_destinations():
    destinations = Destination.query.all()

    return [
        {
            "id": destination.id,
            "name": destination.name,
            "slug": destination.slug,
            "location": destination.location,
            "short_description": destination.short_description,
            "description": destination.description,
            "image": destination.image,
            "highlights": destination.highlights or [],

            "best_time_to_visit": destination.best_time_to_visit,
            "recommended_stay": destination.recommended_stay,
            "climate": destination.climate,
            "wildlife_highlights": destination.wildlife_highlights or [],
            "activities": destination.activities or [],
            "getting_there": destination.getting_there,
            "travel_tips": destination.travel_tips or [],
            "ideal_for": destination.ideal_for or [],
            "featured": destination.featured,

            "created_at": (
                destination.created_at.isoformat()
                if destination.created_at
                else None
            ),
            "updated_at": (
                destination.updated_at.isoformat()
                if destination.updated_at
                else None
            ),
        }
        for destination in destinations
    ], 200


@destinations_bp.route("", methods=["POST"])
def create_destination():
    data = request.get_json() or {}

    required_fields = [
        "name",
        "slug",
        "location",
    ]

    missing_fields = [
        field for field in required_fields
        if not data.get(field)
    ]

    if missing_fields:
        return {
            "error": "Missing required fields",
            "fields": missing_fields,
        }, 400

    name = data["name"].strip()
    slug = data["slug"].strip().lower()
    location = data["location"].strip()

    existing_destination = Destination.query.filter_by(
        slug=slug
    ).first()

    if existing_destination:
        return {
            "error": "A destination with this slug already exists"
        }, 409

    destination = Destination(
        name=name,
        slug=slug,
        location=location,
        short_description=data.get("short_description"),
        description=data.get("description"),
        image=data.get("image"),
        highlights=data.get("highlights", []),

        best_time_to_visit=data.get("best_time_to_visit"),
        recommended_stay=data.get("recommended_stay"),
        climate=data.get("climate"),
        wildlife_highlights=data.get("wildlife_highlights", []),
        activities=data.get("activities", []),
        getting_there=data.get("getting_there"),
        travel_tips=data.get("travel_tips", []),
        ideal_for=data.get("ideal_for", []),
        featured=data.get("featured", False),
    )

    try:
        db.session.add(destination)
        db.session.commit()

        return {
            "message": "Destination created successfully",
            "id": destination.id,
        }, 201

    except Exception:
        db.session.rollback()

        return {
            "error": "Unable to create destination"
        }, 500


@destinations_bp.route(
    "/<int:destination_id>",
    methods=["GET"]
)
def get_destination(destination_id):
    destination = db.session.get(
        Destination,
        destination_id
    )

    if not destination:
        return {
            "error": "Destination not found"
        }, 404

    return {
        "id": destination.id,
        "name": destination.name,
        "slug": destination.slug,
        "location": destination.location,
        "short_description": destination.short_description,
        "description": destination.description,
        "image": destination.image,
        "highlights": destination.highlights or [],

        "best_time_to_visit": destination.best_time_to_visit,
        "recommended_stay": destination.recommended_stay,
        "climate": destination.climate,
        "wildlife_highlights": destination.wildlife_highlights or [],
        "activities": destination.activities or [],
        "getting_there": destination.getting_there,
        "travel_tips": destination.travel_tips or [],
        "ideal_for": destination.ideal_for or [],
        "featured": destination.featured,

        "created_at": (
            destination.created_at.isoformat()
            if destination.created_at
            else None
        ),
        "updated_at": (
            destination.updated_at.isoformat()
            if destination.updated_at
            else None
        ),
    }, 200

@destinations_bp.route("/<int:destination_id>", methods=["PATCH"])
def update_destination(destination_id):
    destination = db.session.get(Destination, destination_id)

    if not destination:
        return {"error": "Destination not found"}, 404

    data = request.get_json() or {}

    editable_fields = [
        "name",
        "slug",
        "location",
        "short_description",
        "description",
        "image",
        "highlights",
        "best_time_to_visit",
        "recommended_stay",
        "climate",
        "wildlife_highlights",
        "activities",
        "getting_there",
        "travel_tips",
        "ideal_for",
        "featured",
    ]

    for field in editable_fields:
        if field in data:
            setattr(destination, field, data[field])

    try:
        db.session.commit()

        return {
            "message": "Destination updated successfully",
            "id": destination.id,
            "name": destination.name,
        }, 200

    except Exception:
        db.session.rollback()

        return {
            "error": "Unable to update destination"
        }, 500