from crypt import methods
from flask import Blueprint, request
from flask_login import (
    login_required,
    current_user,
)
from sqlalchemy.sql import func
from models import db, Rating, Place


rating_bp = Blueprint("rating", __name__, url_prefix="/rating")


@rating_bp.route("/create", methods=["POST"])
@login_required
def create():
    try:
        rating = request.json["rating"]
        place_id = int(request.json["place_id"])
    except KeyError:
        return {"status": "failed", "msg": "Ivalid request body"}, 401

    try:
        place = Place.query.filter_by(id=place_id).first()
        if rating < 1 or rating > 5:
            return {"status": "failed", "msg": "Invalid rating"}, 401

        if place is None:
            return {"status": "failed", "msg": "Invalid place"}, 401

        new_rating = Rating(rating=rating, user_id=current_user.id, place_id=place_id)
        db.session.add(new_rating)
        avg = (
            db.session.query(func.avg(Rating.rating).label("average"))
            .filter(Rating.place_id == place_id)
            .first()[0]
        )
        place.rating = avg
        db.session.commit()

    except Exception as e:
        print(e)
        return {"status": "failed", "msg": "Failed to create list"}, 401

    return {"status": "ok", "msg": "List added successfully"}, 200
