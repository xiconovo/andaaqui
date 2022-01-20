from flask import Blueprint, request
from flask_login import (
    login_required,
    current_user,
)
from models import db, List


lists_bp = Blueprint("lists", __name__, url_prefix="/lists")


@lists_bp.route("/get")
@login_required
def get_lists():
    try:
        lists = List.query.filter_by(user_id=current_user.id)
    except Exception as e:
        print(e)
        return {"status": "failed", "msg": "Search Failed"}, 401
    return {"status": "ok", "lists": [l.name for l in lists]}, 200


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
