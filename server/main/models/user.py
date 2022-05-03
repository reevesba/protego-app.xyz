# coding=utf-8

from sqlalchemy import Column, String, DateTime
from .entity import Entity
from marshmallow import Schema, fields
from server.main import db, bcrypt


class User(Entity, db.Model):
    __tablename__ = "user_account"

    # user authentication information
    email = Column(String(255), nullable=False, unique=True)
    email_confirmed_at = Column(DateTime())
    password = Column(String(255), nullable=False, server_default='')

    # user information
    first_name = Column(String(100), nullable=False, server_default='')
    last_name = Column(String(100), nullable=False, server_default='')
    username = Column(String(128), nullable=False, unique=True)
    photo_url = Column(String())

    # define relationships to role
    roles = db.relationship('Role', secondary='user_role', lazy='dynamic')

    def __init__(self, email, email_confirmed_at, password,
                 first_name, last_name, username, photo_url, created_by):
        Entity.__init__(self, created_by)
        self.email = email
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')
        self.email_confirmed_at = email_confirmed_at
        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.photo_url = photo_url


class UserSchema(Schema):
    id = fields.Number()
    active = fields.Boolean()
    email = fields.Str()
    email_confirmed_at = fields.DateTime()
    password = fields.Str()
    first_name = fields.Str()
    last_name = fields.Str()
    username = fields.Str()
    photo_url = fields.Str()
    created_at = fields.DateTime()
    created_by = fields.Str()
    updated_at = fields.DateTime()
    updated_by = fields.Str()
