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
        field for field in required_fields if not data.get(field)
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

@destinations_bp.route("/<string:slug>", methods=["GET"])
def get_destination(slug):
    destination = Destination.query.filter_by(slug=slug).first_or_404()

    return {
        "id": destination.id,
        "name": destination.name,
        "slug": destination.slug,
        "location": destination.location,
        "short_description": destination.short_description,
        "description": destination.description,
        "image": destination.image,
    }, 200

