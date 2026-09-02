from datetime import datetime

import uuid

from app.extensions import db


class Booking(db.Model):
    __tablename__ = "bookings"

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    reference = db.Column(
        db.String(40),
        unique=True,
        nullable=False,
        default=lambda: f"SEL-{uuid.uuid4().hex[:8].upper()}",
    )

    customer_name = db.Column(
        db.String(150),
        nullable=False,
    )

    customer_email = db.Column(
        db.String(150),
        nullable=False,
    )

    customer_phone = db.Column(
        db.String(50),
    )

    package_id = db.Column(
        db.Integer,
        db.ForeignKey("packages.id"),
        nullable=False,
    )

    travel_date = db.Column(
        db.Date,
        nullable=False,
    )

    return_date = db.Column(
        db.Date,
    )

    guests = db.Column(
        db.Integer,
        nullable=False,
        default=1,
    )

    adults = db.Column(
        db.Integer,
        nullable=False,
        default=1,
    )

    children = db.Column(
        db.Integer,
        nullable=False,
        default=0,
    )

    special_requests = db.Column(
        db.Text,
    )

    # Can remain NULL for quote-based bookings
    # until a consultant supplies the quote.
    total_amount = db.Column(
        db.Numeric(10, 2),
        nullable=True,
    )

    currency = db.Column(
        db.String(10),
        default="USD",
        nullable=False,
    )

    status = db.Column(
        db.String(30),
        default="pending",
        nullable=False,
    )

    payment_status = db.Column(
        db.String(30),
        default="unpaid",
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

    package = db.relationship(
        "Package",
        backref=db.backref(
            "bookings",
            lazy=True,
        ),
    )

    # Optional one-to-one extension.
    # Normal safari bookings simply have no
    # ServeSafariBookingDetail record.
    serve_safari_detail = db.relationship(
        "ServeSafariBookingDetail",
        back_populates="booking",
        uselist=False,
        cascade="all, delete-orphan",
    )