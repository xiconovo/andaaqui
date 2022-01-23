from crypt import methods
from flask import Blueprint, request
from flask_login import (
    login_required,
    current_user,
)
from models import db, Comment


comments_bp = Blueprint("comment", __name__, url_prefix="/comment")


@comments_bp.route("/place", methods=["POST"])
@login_required
def comment_place():
    print("lalalalal")
    try:
        place_id = request.json["place_id"]
        comment = request.json["comment"]
    except KeyError:
        return {"status": "failed", "msg": "Invalide request body"}, 401

    try:
        new_comment = Comment(
            comment=comment, user_id=current_user.id, place_id=place_id
        )
        db.session.add(new_comment)
        db.session.commit()
    except Exception as e:
        print(e)
        return {"status": "failed", "msg": "Failed to create comment"}, 401

    return {"status": "ok", "msg": "Comment added successfully"}, 200
