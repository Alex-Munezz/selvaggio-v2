from datetime import datetime
from decimal import Decimal
import hmac

from flask import Blueprint, current_app, request
from itsdangerous import (
    BadSignature,
    SignatureExpired,
    URLSafeTimedSerializer,
)
from sqlalchemy import func

from app.extensions import db
from app.models.booking import Booking
from app.models.payment import Payment


payments_bp = Blueprint(
    "payments",
    __name__,
    url_prefix="/api/payments",
)


PAYMENT_ACCESS_SALT = (
    "selvaggio-booking-payment-access"
)


def is_development():
    return (
        current_app.debug
        or current_app.config.get(
            "ENV"
        ) == "development"
    )


def _payment_access_secret():
    secret = (
        current_app.config.get(
            "PAYMENT_ACCESS_SECRET"
        )
        or current_app.config.get(
            "SECRET_KEY"
        )
        or current_app.config.get(
            "JWT_SECRET_KEY"
        )
    )

    if not secret:
        raise RuntimeError(
            "Configure PAYMENT_ACCESS_SECRET, "
            "SECRET_KEY, or JWT_SECRET_KEY"
        )

    return secret


def verify_payment_access_token(
    booking,
    token,
):
    # Keep legacy test bookings usable locally.
    # Production always requires a valid token.
    if is_development() and not token:
        return True

    if not token:
        return False

    serializer = URLSafeTimedSerializer(
        _payment_access_secret()
    )

    max_age = current_app.config.get(
        "PAYMENT_ACCESS_TOKEN_MAX_AGE",
        60 * 60 * 24 * 180,
    )

    try:
        payload = serializer.loads(
            token,
            salt=PAYMENT_ACCESS_SALT,
            max_age=max_age,
        )

    except (
        BadSignature,
        SignatureExpired,
    ):
        return False

    reference_matches = hmac.compare_digest(
        str(
            payload.get(
                "booking_reference",
                "",
            )
        ),
        str(
            booking.reference
        ),
    )

    email_matches = hmac.compare_digest(
        str(
            payload.get(
                "customer_email",
                "",
            )
        ).strip().lower(),
        str(
            booking.customer_email
            or ""
        ).strip().lower(),
    )

    return (
        reference_matches
        and email_matches
    )


def get_access_token(data=None):
    token = request.headers.get(
        "X-Booking-Access-Token"
    )

    if token:
        return token

    if isinstance(data, dict):
        token = data.get(
            "access_token"
        )

        if token:
            return token

    return request.args.get(
        "access_token"
    )


def require_booking_access(
    booking,
    data=None,
):
    token = get_access_token(
        data
    )

    if verify_payment_access_token(
        booking,
        token,
    ):
        return None

    return (
        {
            "error":
                (
                    "Valid booking access "
                    "token required"
                )
        },
        403,
    )


def get_booking_payment_summary(
    booking,
):
    if booking.total_amount is None:
        raise ValueError(
            "This booking does not have "
            "a payable total yet"
        )

    paid_amount = db.session.query(
        func.coalesce(
            func.sum(Payment.amount),
            0,
        )
    ).filter(
        Payment.booking_id
        == booking.id,
        Payment.status
        == "paid",
    ).scalar()

    paid_amount = Decimal(
        str(
            paid_amount
        )
    )

    total_amount = Decimal(
        str(
            booking.total_amount
        )
    )

    balance = (
        total_amount
        - paid_amount
    )

    if balance < 0:
        balance = Decimal("0")

    return {
        "total_amount":
            total_amount,
        "paid_amount":
            paid_amount,
        "balance":
            balance,
    }


def update_booking_payment_status(
    booking,
):
    summary = (
        get_booking_payment_summary(
            booking
        )
    )

    if summary["paid_amount"] <= 0:
        booking.payment_status = (
            "unpaid"
        )

    elif summary["balance"] > 0:
        booking.payment_status = (
            "partial"
        )

    else:
        booking.payment_status = (
            "paid"
        )

    return summary


@payments_bp.route(
    "",
    methods=["POST"],
)
def create_payment():
    data = request.get_json() or {}

    booking_reference = data.get(
        "booking_reference"
    )

    requested_amount = data.get(
        "amount"
    )

    provider = (
        str(
            data.get(
                "provider",
                "manual",
            )
        )
        .strip()
        .lower()
    )

    if not booking_reference:
        return {
            "error":
                (
                    "booking_reference "
                    "is required"
                )
        }, 400

    if requested_amount is None:
        return {
            "error":
                "amount is required"
        }, 400

    try:
        requested_amount = Decimal(
            str(
                requested_amount
            )
        ).quantize(
            Decimal("0.01")
        )

    except Exception:
        return {
            "error":
                (
                    "amount must be "
                    "a valid number"
                )
        }, 400

    if requested_amount <= 0:
        return {
            "error":
                (
                    "Payment amount must "
                    "be greater than 0"
                )
        }, 400

    booking = (
        Booking.query
        .filter_by(
            reference=
                booking_reference
        )
        .first()
    )

    if not booking:
        return {
            "error":
                "Booking not found"
        }, 404

    access_error = (
        require_booking_access(
            booking,
            data,
        )
    )

    if access_error:
        return access_error

    if booking.total_amount is None:
        return {
            "error":
                (
                    "This booking requires "
                    "a custom quote before "
                    "payment can begin"
                )
        }, 409

    # Manual payments are only the current
    # development simulator. Production
    # confirmation must come from the real
    # payment provider callback/webhook.
    if (
        provider == "manual"
        and not is_development()
    ):
        return {
            "error":
                (
                    "Manual payments are "
                    "disabled in production"
                )
        }, 403

    try:
        summary = (
            get_booking_payment_summary(
                booking
            )
        )

    except ValueError as error:
        return {
            "error":
                str(error)
        }, 409

    if summary["balance"] <= 0:
        return {
            "error":
                (
                    "This booking has "
                    "already been fully paid"
                )
        }, 400

    if (
        requested_amount
        > summary["balance"]
    ):
        return {
            "error":
                (
                    "Payment amount exceeds "
                    "outstanding balance"
                ),
            "balance":
                float(
                    summary["balance"]
                ),
            "currency":
                booking.currency,
        }, 400

    payment = Payment(
        booking_id=
            booking.id,
        amount=
            requested_amount,
        currency=
            booking.currency,
        provider=
            provider,
        status=
            "pending",
    )

    try:
        db.session.add(
            payment
        )

        db.session.commit()

        return {
            "message":
                (
                    "Payment initialized "
                    "successfully"
                ),

            "payment": {
                "id":
                    payment.id,

                "booking_reference":
                    booking.reference,

                "amount":
                    float(
                        payment.amount
                    ),

                "currency":
                    payment.currency,

                "provider":
                    payment.provider,

                "status":
                    payment.status,
            },

            "booking": {
                "total_amount":
                    float(
                        summary[
                            "total_amount"
                        ]
                    ),

                "paid_amount":
                    float(
                        summary[
                            "paid_amount"
                        ]
                    ),

                "current_balance":
                    float(
                        summary[
                            "balance"
                        ]
                    ),
            },
        }, 201

    except Exception as error:
        db.session.rollback()

        print(
            "Payment initialization error:",
            error,
        )

        return {
            "error":
                (
                    "Unable to initialize "
                    "payment"
                )
        }, 500


@payments_bp.route(
    "/<int:payment_id>/confirm",
    methods=["PATCH"],
)
def confirm_payment(
    payment_id,
):
    # This endpoint exists only for local
    # payment simulation. A real provider
    # must confirm payments server-to-server.
    if not is_development():
        return {
            "error":
                (
                    "Manual payment "
                    "confirmation is disabled "
                    "in production"
                )
        }, 403

    data = request.get_json(
        silent=True
    ) or {}

    payment = db.session.get(
        Payment,
        payment_id,
    )

    if not payment:
        return {
            "error":
                "Payment not found"
        }, 404

    booking = payment.booking

    access_error = (
        require_booking_access(
            booking,
            data,
        )
    )

    if access_error:
        return access_error

    if payment.status == "paid":
        return {
            "error":
                (
                    "Payment has already "
                    "been confirmed"
                )
        }, 400

    if payment.status != "pending":
        return {
            "error":
                (
                    "Only pending payments "
                    "can be confirmed"
                )
        }, 400

    payment.status = "paid"

    payment.paid_at = (
        datetime.utcnow()
    )

    try:
        db.session.flush()

        summary = (
            update_booking_payment_status(
                booking
            )
        )

        db.session.commit()

        return {
            "message":
                (
                    "Payment confirmed "
                    "successfully"
                ),

            "payment": {
                "id":
                    payment.id,

                "amount":
                    float(
                        payment.amount
                    ),

                "currency":
                    payment.currency,

                "provider":
                    payment.provider,

                "status":
                    payment.status,

                "paid_at": (
                    payment
                    .paid_at
                    .isoformat()
                    if payment.paid_at
                    else None
                ),
            },

            "booking": {
                "reference":
                    booking.reference,

                "payment_status":
                    booking.payment_status,

                "total_amount":
                    float(
                        summary[
                            "total_amount"
                        ]
                    ),

                "paid_amount":
                    float(
                        summary[
                            "paid_amount"
                        ]
                    ),

                "balance":
                    float(
                        summary[
                            "balance"
                        ]
                    ),
            },
        }, 200

    except Exception as error:
        db.session.rollback()

        print(
            "Payment confirmation error:",
            error,
        )

        return {
            "error":
                (
                    "Unable to confirm "
                    "payment"
                )
        }, 500


@payments_bp.route(
    "/booking/<reference>",
    methods=["GET"],
)
def get_booking_payments(
    reference,
):
    booking = (
        Booking.query
        .filter_by(
            reference=reference
        )
        .first()
    )

    if not booking:
        return {
            "error":
                "Booking not found"
        }, 404

    access_error = (
        require_booking_access(
            booking
        )
    )

    if access_error:
        return access_error

    if booking.total_amount is None:
        return {
            "error":
                (
                    "This booking requires "
                    "a custom quote before "
                    "payment can begin"
                )
        }, 409

    payments = (
        Payment.query
        .filter_by(
            booking_id=
                booking.id
        )
        .order_by(
            Payment.created_at.desc()
        )
        .all()
    )

    try:
        summary = (
            get_booking_payment_summary(
                booking
            )
        )

    except ValueError as error:
        return {
            "error":
                str(error)
        }, 409

    return {
        "booking": {
            "reference":
                booking.reference,

            "total_amount":
                float(
                    summary[
                        "total_amount"
                    ]
                ),

            "paid_amount":
                float(
                    summary[
                        "paid_amount"
                    ]
                ),

            "balance":
                float(
                    summary[
                        "balance"
                    ]
                ),

            "payment_status":
                booking.payment_status,

            "currency":
                booking.currency,
        },

        "payments": [
            {
                "id":
                    payment.id,

                "amount":
                    float(
                        payment.amount
                    ),

                "currency":
                    payment.currency,

                "provider":
                    payment.provider,

                # Do not expose the provider's
                # raw transaction reference in
                # this customer summary.
                "status":
                    payment.status,

                "paid_at": (
                    payment
                    .paid_at
                    .isoformat()
                    if payment.paid_at
                    else None
                ),

                "created_at": (
                    payment
                    .created_at
                    .isoformat()
                    if payment.created_at
                    else None
                ),
            }
            for payment in payments
        ],
    }, 200


@payments_bp.route(
    "/<int:payment_id>",
    methods=["GET"],
)
def get_payment(
    payment_id,
):
    payment = db.session.get(
        Payment,
        payment_id,
    )

    if not payment:
        return {
            "error":
                "Payment not found"
        }, 404

    booking = payment.booking

    access_error = (
        require_booking_access(
            booking
        )
    )

    if access_error:
        return access_error

    return {
        "id":
            payment.id,

        "booking_reference":
            booking.reference,

        "amount":
            float(
                payment.amount
            ),

        "currency":
            payment.currency,

        "provider":
            payment.provider,

        "status":
            payment.status,

        "paid_at": (
            payment.paid_at.isoformat()
            if payment.paid_at
            else None
        ),

        "created_at": (
            payment.created_at.isoformat()
            if payment.created_at
            else None
        ),
    }, 200