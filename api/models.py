from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db: SQLAlchemy = SQLAlchemy()


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(80), nullable=False, unique=True)


list_entries = db.Table(
    "list_entries",
    db.Column("place_id", db.Integer, db.ForeignKey("place.id")),
    db.Column("list_id", db.Integer, db.ForeignKey("list.id")),
    __table_args__=(
        db.UniqueConstraint("place_id", "list_id", name="unique_per_list"),
    ),
)


class Place(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False, unique=True)
    lat = db.Column(db.Float, nullable=False)
    long = db.Column(db.Float, nullable=False)
    lists = db.relationship("List", secondary=list_entries, back_populates="places")


class List(db.Model):
    __table_args__ = (db.UniqueConstraint("user_id", "name", name="unique_per_user"),)
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    places = db.relationship("Place", secondary=list_entries, back_populates="lists")
