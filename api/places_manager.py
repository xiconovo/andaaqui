from curses import meta
from flask import Blueprint, request
from flask_bcrypt import Bcrypt
from flask_login import (
    login_required,
    current_user,
)
from models import db, Place
from sqlalchemy.sql import text
import json

places_bp = Blueprint("places", __name__, url_prefix="/places")


@places_bp.route("/search")
@login_required
def search():
    print("search places")
    try:
        lat = float(request.json["lat"])
        long = float(request.json["long"])
        radius = float(request.json["radius"])
    except (KeyError, ValueError):
        return {"status": "failed", "msg": "Ivalid request body"}, 401
    try:
        clause = text(
            "((111 * (lat - :lat))*((111 * (lat - :lat))) + (85.0 * (long - :long))*(85.0 * (long - :long))) < (:radius * :radius)"
        )
        places = (
            Place.query.filter(clause).params(lat=lat, long=long, radius=radius).all()
        )
    except Exception as e:
        print(e)
        return {"status": "failed", "msg": "Search Failed"}, 401
    print("FoundPlaces: ", places)
    return {
        "status": "ok",
        "places": [
            {"name": place.name, "lat": place.lat, "long": place.lat}
            for place in places
        ],
    }, 200


@places_bp.route("/create", methods=["POST"])
@login_required
def create():
    print("create places")
    try:
        name = request.json["name"]
        lat = float(request.json["lat"])
        long = float(request.json["long"])
    except (KeyError, ValueError):
        return {"status": "failed", "msg": "Ivalid request body"}, 401

    try:
        new_place = Place(name=name, lat=lat, long=long)
        db.session.add(new_place)
        db.session.commit()
    except Exception as e:
        print(e)
        return {"status": "failed", "msg": "Failed to create place"}, 401

    return {"status": "ok", "msg": "Place added successfully"}, 200


@places_bp.route("/delete")
@login_required
def delete():
    print("delete place")
    try:
        name = request.json["name"]
    except (KeyError, ValueError):
        return {"status": "failed", "msg": "Ivalid request body"}, 401

    try:
        Place.query.filter_by(name=name).delete()
        db.session.commit()
    except Exception as e:
        print(e)
        return {"status": "failed", "msg": "Failed to delete place"}, 401

    return {"status": "ok", "msg": "Place deleted successfully"}, 200