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
    db.Column("place_id", db.Integer, db.ForeignKey("place.id"),primary_key=True),
    db.Column("list_id", db.Integer, db.ForeignKey("list.id"),primary_key=True)
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

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    place_id = db.Column(db.Integer,db.ForeignKey("place.id"),nullable=False)


