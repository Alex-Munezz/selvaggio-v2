from datetime import datetime

from app.extensions import db


class PackagePrice(db.Model):
    __tablename__ = "package_prices"

    id = db.Column(db.Integer, primary_key=True)

    package_id = db.Column(
        db.Integer,
        db.ForeignKey("packages.id"),
        nullable=False,
    )

    season_name = db.Column(
        db.String(120),
        nullable=True,
    )

    start_date = db.Column(
        db.Date,
        nullable=True,
    )

    end_date = db.Column(
        db.Date,
        nullable=True,
    )

    currency = db.Column(
        db.String(10),
        default="USD",
        nullable=False,
    )

    accommodation_level = db.Column(
        db.String(50),
        default="Mid-Range",
        nullable=False,
    )

    price_1_pax = db.Column(db.Numeric(10, 2), nullable=True)
    price_2_pax = db.Column(db.Numeric(10, 2), nullable=True)
    price_3_pax = db.Column(db.Numeric(10, 2), nullable=True)
    price_4_pax = db.Column(db.Numeric(10, 2), nullable=True)
    price_5_pax = db.Column(db.Numeric(10, 2), nullable=True)
    price_6_pax = db.Column(db.Numeric(10, 2), nullable=True)
    child_price = db.Column(db.Numeric(10, 2), nullable=True)
    price_7_pax = db.Column(db.Numeric(10, 2), nullable=True)
    price_8_pax = db.Column(db.Numeric(10, 2), nullable=True)

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
            "prices",
            lazy=True,
            cascade="all, delete-orphan",
            order_by="PackagePrice.start_date",
        ),
    )