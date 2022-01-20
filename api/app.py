from flask import Flask
from auth_manager import auth, bcrypt, login_manager
from places_manager import places_bp
from lists_manager import lists_bp
from models import db

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"


def start_server():
    app.config["SECRET_KEY"] = "1234567890abcd"
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    bcrypt.init_app(app)
    db.init_app(app)
    login_manager.init_app(app)
    app.register_blueprint(auth)
    app.register_blueprint(places_bp)
    app.register_blueprint(lists_bp)
    app.run(port=8080, debug=True)


if __name__ == "__main__":
    start_server()
