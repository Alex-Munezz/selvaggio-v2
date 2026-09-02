from datetime import datetime

from app.extensions import db


class ServeSafariBookingDetail(db.Model):
    __tablename__ = "serve_safari_booking_details"

    id = db.Column(
        db.Integer,
        primary_key=True,
    )

    booking_id = db.Column(
        db.Integer,
        db.ForeignKey(
            "bookings.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        unique=True,
        index=True,
    )

    # -----------------------------------------------------
    # ORGANISATION / TEAM
    # -----------------------------------------------------

    organisation_name = db.Column(
        db.String(180),
        nullable=False,
    )

    organisation_type = db.Column(
        db.String(80),
        nullable=True,
    )

    # -----------------------------------------------------
    # MISSION
    # -----------------------------------------------------

    mission_location = db.Column(
        db.String(255),
        nullable=False,
    )

    mission_start_date = db.Column(
        db.Date,
        nullable=True,
    )

    mission_end_date = db.Column(
        db.Date,
        nullable=True,
    )

    # -----------------------------------------------------
    # ARRIVAL
    # -----------------------------------------------------

    arrival_flight_number = db.Column(
        db.String(80),
        nullable=True,
    )

    arrival_date = db.Column(
        db.Date,
        nullable=True,
    )

    arrival_time = db.Column(
        db.Time,
        nullable=True,
    )

    # -----------------------------------------------------
    # DEPARTURE
    # -----------------------------------------------------

    departure_flight_number = db.Column(
        db.String(80),
        nullable=True,
    )

    departure_date = db.Column(
        db.Date,
        nullable=True,
    )

    departure_time = db.Column(
        db.Time,
        nullable=True,
    )

    # -----------------------------------------------------
    # SERVICES
    #
    # Example:
    #
    # [
    #   "airport-transfer",
    #   "daily-transport",
    #   "hotel-transfer",
    #   "safari-extension"
    # ]
    # -----------------------------------------------------

    service_needs = db.Column(
        db.JSON,
        default=list,
        nullable=False,
    )

    transport_notes = db.Column(
        db.Text,
        nullable=True,
    )

    # -----------------------------------------------------
    # FUTURE-PROOF FIELD
    #
    # Any additional mission-specific details that
    # don't justify another database migration can
    # safely live here.
    # -----------------------------------------------------

    extra_details = db.Column(
        db.JSON,
        default=dict,
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

    booking = db.relationship(
        "Booking",
        back_populates="serve_safari_detail",
    )