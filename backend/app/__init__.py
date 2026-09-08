from flask import Flask
from flask_cors import CORS
from config import Config
from app.extensions import db, migrate, jwt
from app.models import Destination, Package, Booking, Payment, PackageItinerary, PackagePrice
from app.routes.destinations import destinations_bp
from app.routes.packages import packages_bp
from app.routes.bookings import ( bookings_bp, admin_bookings_bp)
from app.routes.payments import payments_bp
from app.routes.admin_auth import ( admin_auth_bp )
from app.routes.cloudinary_config import uploads_bp
from app.models.serve_safari_booking_detail import (
    ServeSafariBookingDetail,
)

import os
from datetime import timedelta

def create_app():
 app = Flask(__name__)
 app.config["JWT_SECRET_KEY"] = os.getenv(
    "JWT_SECRET_KEY"
 )
 
 app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(
     hours=8
 )
 CORS(
    app,
    resources={
        r"/api/*": {
            "origins": [
                "http://localhost:3000",
                "http://127.0.0.1:3000",
                "https://selvaggiosafarissolutions.netlify.app/",
                "https://selvaggiosafarissolutions.netlify.app"
                "https://selvaggiosafaris.com",
                "https://www.selvaggiosafaris.com",
            ],
            "methods": [
                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE",
                "OPTIONS",
            ],
            "allow_headers": [
                "Content-Type",
                "Authorization",
            ],
        }
    },
)
 
 app.config.from_object(Config)
 
 db.init_app(app)
 migrate.init_app(app, db)
 jwt.init_app(app)

 app.register_blueprint(destinations_bp)
 app.register_blueprint(packages_bp)
 app.register_blueprint(bookings_bp)
 app.register_blueprint(payments_bp)
 app.register_blueprint(admin_bookings_bp)
 app.register_blueprint(admin_auth_bp)
 app.register_blueprint(uploads_bp)
 
 @app.route("/")
 def index():
    try:
        db.session.execute(db.text("SELECT 1"))
        return {"message": "Flask + PostgreSQL connection is working"}
    except Exception as e:
        return {"error": str(e)}, 500

 return app
