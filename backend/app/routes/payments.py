from decimal import Decimal
from sqlalchemy import func
from flask import Blueprint, request
from app.extensions import db
from app.models.payment import Payment
from app.models.booking import Booking
from datetime import datetime

payments_bp = Blueprint(
    "payments",
    __name__,
    url_prefix="/api/payments",
)

def get_booking_payment_summary(booking):
    paid_amount = db.session.query(
        func.coalesce(
            func.sum(Payment.amount),
            0
        )
    ).filter(
        Payment.booking_id == booking.id,
        Payment.status == "paid",
    ).scalar()

    paid_amount = Decimal(str(paid_amount))
    total_amount = Decimal(str(booking.total_amount))

    balance = total_amount - paid_amount

    return {
        "total_amount": total_amount,
        "paid_amount": paid_amount,
        "balance": balance,
    }

def update_booking_payment_status(booking):
    summary = get_booking_payment_summary(booking)

    if summary["paid_amount"] <= 0:
        booking.payment_status = "unpaid"

    elif summary["balance"] > 0:
        booking.payment_status = "partial"

    else:
        booking.payment_status = "paid"

    return summary

@payments_bp.route("", methods=["POST"])
def create_payment():
    data = request.get_json() or {}

    booking_reference = data.get("booking_reference")
    requested_amount = data.get("amount")
    provider = data.get("provider", "manual")

    if not booking_reference:
        return {
            "error": "booking_reference is required"
        }, 400

    if requested_amount is None:
        return {
            "error": "amount is required"
        }, 400

    try:
        requested_amount = Decimal(
            str(requested_amount)
        ).quantize(Decimal("0.01"))
    except Exception:
        return {
            "error": "amount must be a valid number"
        }, 400

    if requested_amount <= 0:
        return {
            "error": "Payment amount must be greater than 0"
        }, 400

    booking = Booking.query.filter_by(
        reference=booking_reference
    ).first()

    if not booking:
        return {
            "error": "Booking not found"
        }, 404

    summary = get_booking_payment_summary(
        booking
    )

    if summary["balance"] <= 0:
        return {
            "error": "This booking has already been fully paid"
        }, 400

    if requested_amount > summary["balance"]:
        return {
            "error": "Payment amount exceeds outstanding balance",
            "balance": float(summary["balance"]),
            "currency": booking.currency,
        }, 400

    payment = Payment(
        booking_id=booking.id,
        amount=requested_amount,
        currency=booking.currency,
        provider=provider,
        status="pending",
    )

    try:
        db.session.add(payment)
        db.session.commit()

        return {
            "message": "Payment initialized successfully",
            "payment": {
                "id": payment.id,
                "booking_reference": booking.reference,
                "amount": float(payment.amount),
                "currency": payment.currency,
                "provider": payment.provider,
                "status": payment.status,
            },
            "booking": {
                "total_amount": float(
                    summary["total_amount"]
                ),
                "paid_amount": float(
                    summary["paid_amount"]
                ),
                "current_balance": float(
                    summary["balance"]
                ),
            },
        }, 201

    except Exception:
        db.session.rollback()

        return {
            "error": "Unable to initialize payment"
        }, 500

@payments_bp.route("/<int:payment_id>/confirm", methods=["PATCH"])
def confirm_payment(payment_id):
    payment = db.session.get(Payment, payment_id)

    if not payment:
        return {
            "error": "Payment not found"
        }, 404

    if payment.status == "paid":
        return {
            "error": "Payment has already been confirmed"
        }, 400

    if payment.status != "pending":
        return {
            "error": "Only pending payments can be confirmed"
        }, 400

    booking = payment.booking

    payment.status = "paid"
    payment.paid_at = datetime.utcnow()

    try:
        db.session.flush()

        summary = update_booking_payment_status(
            booking
        )

        db.session.commit()

        return {
            "message": "Payment confirmed successfully",
            "payment": {
                "id": payment.id,
                "amount": float(payment.amount),
                "currency": payment.currency,
                "provider": payment.provider,
                "status": payment.status,
                "paid_at": (
                    payment.paid_at.isoformat()
                    if payment.paid_at
                    else None
                ),
            },
            "booking": {
                "reference": booking.reference,
                "payment_status": booking.payment_status,
                "total_amount": float(
                    summary["total_amount"]
                ),
                "paid_amount": float(
                    summary["paid_amount"]
                ),
                "balance": float(
                    summary["balance"]
                ),
            },
        }, 200

    except Exception:
        db.session.rollback()

        return {
            "error": "Unable to confirm payment"
        }, 500

@payments_bp.route("/booking/<reference>", methods=["GET"])
def get_booking_payments(reference):
    booking = Booking.query.filter_by(
        reference=reference
    ).first()

    if not booking:
        return {
            "error": "Booking not found"
        }, 404

    payments = Payment.query.filter_by(
        booking_id=booking.id
    ).order_by(
        Payment.created_at.desc()
    ).all()

    summary = get_booking_payment_summary(
        booking
    )

    return {
        "booking": {
            "reference": booking.reference,
            "total_amount": float(
                summary["total_amount"]
            ),
            "paid_amount": float(
                summary["paid_amount"]
            ),
            "balance": float(
                summary["balance"]
            ),
            "payment_status": booking.payment_status,
            "currency": booking.currency,
        },
        "payments": [
            {
                "id": payment.id,
                "amount": float(payment.amount),
                "currency": payment.currency,
                "provider": payment.provider,
                "transaction_reference": payment.transaction_reference,
                "status": payment.status,
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
            }
            for payment in payments
        ],
    }, 200

@payments_bp.route("/<int:payment_id>", methods=["GET"])
def get_payment(payment_id):
    payment = db.session.get(
        Payment,
        payment_id
    )

    if not payment:
        return {
            "error": "Payment not found"
        }, 404

    return {
        "id": payment.id,
        "booking_reference": payment.booking.reference,
        "amount": float(payment.amount),
        "currency": payment.currency,
        "provider": payment.provider,
        "transaction_reference": payment.transaction_reference,
        "status": payment.status,
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