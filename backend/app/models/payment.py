from datetime import datetime

from app.extensions import db


class Payment(db.Model):
    __tablename__ = "payments"

    id = db.Column(db.Integer, primary_key=True)

    booking_id = db.Column(
        db.Integer,
        db.ForeignKey("bookings.id"),
        nullable=False,
    )

    amount = db.Column(
        db.Numeric(10, 2),
        nullable=False,
    )

    currency = db.Column(
        db.String(10),
        nullable=False,
    )

    provider = db.Column(
        db.String(50),
        nullable=True,
    )

    transaction_reference = db.Column(
        db.String(150),
        unique=True,
        nullable=True,
    )

    status = db.Column(
        db.String(30),
        default="pending",
        nullable=False,
    )

    paid_at = db.Column(
        db.DateTime,
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

    booking = db.relationship(
        "Booking",
        backref=db.backref("payments", lazy=True),
    )