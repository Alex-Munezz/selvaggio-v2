from functools import wraps

from flask import Blueprint, request
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required,
)

from app.extensions import db
from app.models import AdminUser


admin_auth_bp = Blueprint(
    "admin_auth",
    __name__,
    url_prefix="/api/admin/auth",
)


# ---------------------------------------------------------
# STAFF AUTH DECORATOR
# ---------------------------------------------------------

def staff_required(view_function):
    @wraps(view_function)
    @jwt_required()
    def wrapped_view(*args, **kwargs):
        identity = get_jwt_identity()

        try:
            admin_id = int(identity)
        except (TypeError, ValueError):
            return {
                "error": "Invalid authentication token"
            }, 401

        admin = db.session.get(
            AdminUser,
            admin_id,
        )

        if not admin:
            return {
                "error": "Staff account not found"
            }, 401

        if not admin.active:
            return {
                "error": "Staff account is inactive"
            }, 403

        return view_function(
            *args,
            **kwargs,
        )

    return wrapped_view


# ---------------------------------------------------------
# LOGIN
# ---------------------------------------------------------

@admin_auth_bp.route(
    "/login",
    methods=["POST"],
)
def admin_login():
    data = request.get_json() or {}

    email = (
        data.get("email", "")
        .strip()
        .lower()
    )

    password = data.get(
        "password",
        "",
    )

    if not email or not password:
        return {
            "error":
                "Email and password are required"
        }, 400

    admin = AdminUser.query.filter_by(
        email=email
    ).first()

    if not admin:
        return {
            "error":
                "Invalid email or password"
        }, 401

    if not admin.active:
        return {
            "error":
                "This staff account is inactive"
        }, 403

    if not admin.check_password(password):
        return {
            "error":
                "Invalid email or password"
        }, 401

    access_token = create_access_token(
        identity=str(admin.id),
        additional_claims={
            "role": admin.role,
            "email": admin.email,
        },
    )

    return {
        "message":
            "Login successful",
        "access_token":
            access_token,
        "user":
            admin.to_dict(),
    }, 200


# ---------------------------------------------------------
# CURRENT STAFF USER
# ---------------------------------------------------------

@admin_auth_bp.route(
    "/me",
    methods=["GET"],
)
@staff_required
def admin_me():
    admin_id = int(
        get_jwt_identity()
    )

    admin = db.session.get(
        AdminUser,
        admin_id,
    )

    return {
        "user": admin.to_dict()
    }, 200


# ---------------------------------------------------------
# LOGOUT
# ---------------------------------------------------------

@admin_auth_bp.route(
    "/logout",
    methods=["POST"],
)
@staff_required
def admin_logout():
    return {
        "message":
            "Logout successful"
    }, 200