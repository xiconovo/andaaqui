from crypt import methods
from flask import Blueprint, request
from flask_login import (
    login_required,
    current_user,
)
from models import db, List, list_entries, Place


lists_bp = Blueprint("lists", __name__, url_prefix="/lists")


@lists_bp.route("/list")
@login_required
def list_lists():
    db.create_all()
    try:
        lists = List.query.filter_by(user_id=current_user.id)
    except Exception as e:
        print(e)
        return {"status": "failed", "msg": "Search Failed"}, 401
    return {
        "status": "ok",
        "lists": [{"id": l.id, "name:": l.name} for l in lists],
    }, 200


@lists_bp.route("/get")
@login_required
def get_list():
    try:
        list_name = request.json["name"]
    except KeyError:
        return {"status": "failed", "msg": "Ivalid request body"}, 401

    try:
        the_list = List.query.filter_by(name=list_name, user_id=current_user.id).first()
        if the_list is None:
            return {"status": "failed", "msg": "List not found"}, 401
        list_places = Place.query.join(list_entries).join(List).filter(List.name == the_list.name).all()
    except Exception as e:
        print("Error: ", e)
        return {"status": "failed", "msg": "Search Failed"}, 401

    return {
        "status": "ok",
        "lists": {
            "id": the_list.id,
            "name:": the_list.name,
            "places": [
                {"name": place.name, "lat": place.lat, "long": place.long}
                for place in list_places
            ],
        },
    }, 200


@lists_bp.route("/create", methods=["POST"])
@login_required
def create():
    try:
        name = request.json["name"]
    except KeyError:
        return {"status": "failed", "msg": "Ivalid request body"}, 401

    try:
        new_list = List(name=name, user_id=current_user.id)
        db.session.add(new_list)
        db.session.commit()
    except Exception as e:
        print(e)
        return {"status": "failed", "msg": "Failed to create list"}, 401

    return {"status": "ok", "msg": "List added successfully"}, 200


@lists_bp.route("/delete", methods=["DELETE"])
@login_required
def delete():
    try:
        name = request.json["name"]
    except KeyError:
        return {"status": "failed", "msg": "Ivalid request body"}, 401

    try:
        List.query.filter_by(user_id=current_user.id, name=name).delete()
        db.session.commit()
    except Exception as e:
        print(e)
        return {"status": "failed", "msg": "Failed to delete list"}, 401

    return {"status": "ok", "msg": "List deleted successfully"}, 200


@lists_bp.route("/addplace", methods=["POST"])
@login_required
def addplace():
    try:
        list_name = request.json["list_name"]
        place_name = request.json["place_name"]
    except KeyError:
        return {"status": "failed", "msg": "Ivalid request body"}, 401

    try:
        list = List.query.filter_by(user_id=current_user.id, name=list_name).first()
        place = Place.query.filter_by(name=place_name).first()
        list.places.append(place)
        db.session.add(list)
        db.session.commit()
    except Exception as e:
        print(e)
        return {"status": "failed", "msg": "Failed to create list"}, 401

    return {"status": "ok", "msg": "Place added to list successfully"}, 200


@lists_bp.route("/deleteplace", methods=["DELETE"])
@login_required
def deleteplace():
    try:
        list_name = request.json["list_name"]
        place_name = request.json["place_name"]
    except KeyError:
        return {"status": "failed", "msg": "Ivalid request body"}, 401

    try:
        list = List.query.filter_by(user_id=current_user.id, name=list_name).first()
        place = Place.query.filter_by(name=place_name).first()
        db.session.query(list_entries).filter_by(place_id=place.id, list_id=list.id).delete()
        db.session.commit()
    except Exception as e:
        print(e)
        return {"status": "failed", "msg": "Failed to create list"}, 401

    return {"status": "ok", "msg": "Place recmoved from list successfully"}, 200
