from datetime import datetime

from app.extensions import db


class PackageItinerary(db.Model):
    __tablename__ = "package_itineraries"

    id = db.Column(db.Integer, primary_key=True)

    package_id = db.Column(
        db.Integer,
        db.ForeignKey("packages.id"),
        nullable=False,
    )

    day_number = db.Column(
        db.Integer,
        nullable=False,
    )

    title = db.Column(
        db.String(200),
        nullable=False,
    )

    description = db.Column(
        db.Text,
        nullable=True,
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    package = db.relationship(
        "Package",
        backref=db.backref(
            "itinerary",
            lazy=True,
            cascade="all, delete-orphan",
            order_by="PackageItinerary.day_number",
        ),
    )