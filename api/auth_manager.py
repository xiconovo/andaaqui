from flask import Blueprint, request
from flask_bcrypt import Bcrypt
from flask_login import (
    login_user,
    LoginManager,
    login_required,
    logout_user,
    current_user,
)
from models import db, User

auth = Blueprint("auth", __name__)
bcrypt = Bcrypt()
login_manager = LoginManager()


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@auth.route("/login", methods=["POST"])
def login():
    username = request.json["username"]
    password = request.json["password"]
    user = User.query.filter_by(username=username).first()
    if user:
        if bcrypt.check_password_hash(user.password, password):
            login_user(user)
            return {"status": "ok", "msg": "Login success"}, 200
        else:
            print("Password errada")

    return {"status": "failed", "msg": "Login failed"}, 401


@auth.route("/register", methods=["POST"])
def register():
    try:
        username = request.json["username"]
        password = bcrypt.generate_password_hash(request.json["password"])
        email = request.json["email"]
        new_user = User(username=username, password=password, email=email)
        db.session.add(new_user)
        db.session.commit()
    except KeyError as e:
        return {"status": "failed", "msg": "Ivalid request body"}, 401
    except Exception as e:
        return {"status": "failed", "msg": f"{e}"}, 401

    return {"status": "ok", "msg": "User registered with success"}, 201


@auth.route("/auth")
@login_required
def isauth():
    return {"username": current_user.username}, 200


@auth.route("/logout")
@login_required
def logout():
    logout_user()
    return {"status": "ok", "msg": "Logout success"}, 200
