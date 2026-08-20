from flask import Flask

from config import Config
from app.extensions import db, migrate
from app.models import Destination, Package, Booking, Payment, PackageItinerary, PackagePrice
from app.routes.destinations import destinations_bp
from app.routes.packages import packages_bp
from app.routes.bookings import bookings_bp
from app.routes.payments import payments_bp

def create_app():
 app = Flask(__name__)
 
 app.config.from_object(Config)
 
 db.init_app(app)
 migrate.init_app(app, db)

 app.register_blueprint(destinations_bp)
 app.register_blueprint(packages_bp)
 app.register_blueprint(bookings_bp)
 app.register_blueprint(payments_bp)

 @app.route("/")
 def index():
    try:
        db.session.execute(db.text("SELECT 1"))
        return {"message": "Flask + PostgreSQL connection is working"}
    except Exception as e:
        return {"error": str(e)}, 500

 return app
