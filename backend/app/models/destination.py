from datetime import datetime

from app.extensions import db


class Destination(db.Model):
    __tablename__ = "destinations"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    slug = db.Column(db.String(120), unique=True, nullable=False)
    location = db.Column(db.String(120), nullable=False)
    short_description = db.Column(db.String(255))
    description = db.Column(db.Text)
    image = db.Column(db.String(255))
    highlights = db.Column(
        db.JSON,
        default=list,
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
    best_time_to_visit = db.Column(
    db.String(255),
    nullable=True,
    ) 
    
    recommended_stay = db.Column(
        db.String(120),
        nullable=True,
    )
    
    climate = db.Column(
        db.Text,
        nullable=True,
    )
    
    wildlife_highlights = db.Column(
        db.JSON,
        nullable=True,
    )
    
    activities = db.Column(
        db.JSON,
        nullable=True,
    )
    
    getting_there = db.Column(
        db.Text,
        nullable=True,
    )
    
    travel_tips = db.Column(
        db.JSON,
        nullable=True,
    )
    
    ideal_for = db.Column(
        db.JSON,
        nullable=True,
    )
    
    featured = db.Column(
        db.Boolean,
        nullable=False,
        default=False,
    )