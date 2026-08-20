from datetime import datetime

from app.extensions import db


package_destinations = db.Table(
    "package_destinations",
    db.Column(
        "package_id",
        db.Integer,
        db.ForeignKey("packages.id"),
        primary_key=True,
    ),
    db.Column(
        "destination_id",
        db.Integer,
        db.ForeignKey("destinations.id"),
        primary_key=True,
    ),
)


class Package(db.Model):
    __tablename__ = "packages"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(
        db.String(150),
        nullable=False,
    )

    slug = db.Column(
        db.String(150),
        unique=True,
        nullable=False,
    )

    short_description = db.Column(
        db.String(255),
        nullable=True,
    )

    description = db.Column(
        db.Text,
        nullable=True,
    )

    category = db.Column(
        db.String(120),
        nullable=True,
    )

    duration_days = db.Column(
        db.Integer,
        nullable=False,
    )

    duration_nights = db.Column(
        db.Integer,
        nullable=True,
    )

    # Optional "from" price for frontend cards.
    # Full seasonal/group pricing will live in a separate table.
    price = db.Column(
        db.Numeric(10, 2),
        nullable=True,
    )

    currency = db.Column(
        db.String(10),
        default="USD",
        nullable=False,
    )

    image = db.Column(
        db.String(255),
        nullable=True,
    )

    highlights = db.Column(
        db.JSON,
        default=list,
        nullable=False,
    )

    inclusions = db.Column(
        db.JSON,
        default=list,
        nullable=False,
    )

    exclusions = db.Column(
        db.JSON,
        default=list,
        nullable=False,
    )

    optional_extras = db.Column(
        db.JSON,
        default=list,
        nullable=False,
    )

    featured = db.Column(
        db.Boolean,
        default=False,
        nullable=False,
    )

    active = db.Column(
        db.Boolean,
        default=True,
        nullable=False,
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

    destinations = db.relationship(
        "Destination",
        secondary=package_destinations,
        backref=db.backref(
            "packages",
            lazy="dynamic",
        ),
    )