import os
import smtplib

from email.message import EmailMessage


def safe(value, fallback="-"):
    if value is None:
        return fallback

    value = str(value).strip()

    return value if value else fallback


def format_date(value):
    if not value:
        return "-"

    return value.strftime("%d %B %Y")


def format_time(value):
    if not value:
        return "-"

    return value.strftime("%H:%M")


def send_booking_notification(booking):
    smtp_host = os.getenv("SMTP_HOST")
    smtp_port = int(
        os.getenv("SMTP_PORT", "587")
    )

    smtp_user = os.getenv("SMTP_USER")
    smtp_password = os.getenv("SMTP_PASSWORD")

    from_email = os.getenv(
        "SMTP_FROM_EMAIL",
        smtp_user,
    )

    notification_email = os.getenv(
        "BOOKINGS_NOTIFICATION_EMAIL"
    )

    if not all([
        smtp_host,
        smtp_user,
        smtp_password,
        from_email,
        notification_email,
    ]):
        raise RuntimeError(
            "Booking email SMTP configuration is incomplete"
        )

    package = booking.package

    is_serve_safari = (
        package
        and package.category
        == "serve-and-safari"
    )

    booking_type = (
        "Serve & Safari"
        if is_serve_safari
        else "Regular Safari"
    )

    lines = [
        f"NEW {booking_type.upper()} BOOKING",
        "",
        "BOOKING DETAILS",
        "----------------------------------------",
        f"Reference: {safe(booking.reference)}",
        f"Booking Type: {booking_type}",
        f"Status: {safe(booking.status)}",
        f"Payment Status: {safe(booking.payment_status)}",
        "",
        "CUSTOMER",
        "----------------------------------------",
        f"Name: {safe(booking.customer_name)}",
        f"Email: {safe(booking.customer_email)}",
        f"Phone: {safe(booking.customer_phone)}",
        "",
        "SAFARI",
        "----------------------------------------",
        f"Package: {safe(package.name if package else None)}",
        f"Travel Date: {format_date(booking.travel_date)}",
        f"Return Date: {format_date(booking.return_date)}",
        f"Adults: {safe(booking.adults)}",
        f"Children: {safe(booking.children)}",
        f"Total Guests: {safe(booking.guests)}",
        "",
    ]

    if booking.total_amount is not None:
        lines.extend([
            "PRICING",
            "----------------------------------------",
            (
                f"Total Amount: "
                f"{safe(booking.currency)} "
                f"{booking.total_amount}"
            ),
            "",
        ])

    else:
        lines.extend([
            "PRICING",
            "----------------------------------------",
            "Custom quote required",
            "",
        ])

    if booking.special_requests:
        lines.extend([
            "SPECIAL REQUESTS",
            "----------------------------------------",
            safe(booking.special_requests),
            "",
        ])

    # Serve & Safari-specific information
    if is_serve_safari:
        detail = booking.serve_safari_detail

        if detail:
            lines.extend([
                "SERVE & SAFARI DETAILS",
                "----------------------------------------",
                (
                    "Organisation Name: "
                    f"{safe(detail.organisation_name)}"
                ),
                (
                    "Organisation Type: "
                    f"{safe(detail.organisation_type)}"
                ),
                (
                    "Mission Location: "
                    f"{safe(detail.mission_location)}"
                ),
                (
                    "Mission Start Date: "
                    f"{format_date(detail.mission_start_date)}"
                ),
                (
                    "Mission End Date: "
                    f"{format_date(detail.mission_end_date)}"
                ),
                "",
                "ARRIVAL",
                "----------------------------------------",
                (
                    "Flight Number: "
                    f"{safe(detail.arrival_flight_number)}"
                ),
                (
                    "Arrival Date: "
                    f"{format_date(detail.arrival_date)}"
                ),
                (
                    "Arrival Time: "
                    f"{format_time(detail.arrival_time)}"
                ),
                "",
                "DEPARTURE",
                "----------------------------------------",
                (
                    "Flight Number: "
                    f"{safe(detail.departure_flight_number)}"
                ),
                (
                    "Departure Date: "
                    f"{format_date(detail.departure_date)}"
                ),
                (
                    "Departure Time: "
                    f"{format_time(detail.departure_time)}"
                ),
                "",
            ])

            if detail.service_needs:
                lines.extend([
                    "SERVICE NEEDS",
                    "----------------------------------------",
                    *[
                        f"- {item}"
                        for item in detail.service_needs
                    ],
                    "",
                ])

            if detail.transport_notes:
                lines.extend([
                    "TRANSPORT NOTES",
                    "----------------------------------------",
                    safe(detail.transport_notes),
                    "",
                ])

            if detail.extra_details:
                lines.extend([
                    "EXTRA DETAILS",
                    "----------------------------------------",
                ])

                for key, value in (
                    detail.extra_details.items()
                ):
                    lines.append(
                        f"{key}: {value}"
                    )

                lines.append("")

    lines.extend([
        "----------------------------------------",
        "Selvaggio Safaris Booking System",
    ])

    message = EmailMessage()

    message["Subject"] = (
        f"New {booking_type} Booking - "
        f"{booking.reference}"
    )

    message["From"] = from_email

    message["To"] = notification_email

    # Useful when clicking Reply in the inbox
    if booking.customer_email:
        message["Reply-To"] = (
            booking.customer_email
        )

    message.set_content(
        "\n".join(lines)
    )

    with smtplib.SMTP(
        smtp_host,
        smtp_port,
        timeout=20,
    ) as server:

        server.ehlo()

        server.starttls()

        server.ehlo()

        server.login(
            smtp_user,
            smtp_password,
        )

        server.send_message(
            message
        )