# coding=utf-8

from sqlalchemy import Column, String
from .entity import Entity
from marshmallow import Schema, fields
from server.main import db


class Group(Entity, db.Model):
    __tablename__ = "group"

    name = Column(String(50))
    description = Column(String(100))
    admin = Column(String(100))

    # define one-to-many relationships
    group_members = db.relationship("GroupMember", cascade="all, delete")
    api_tokens = db.relationship("ApiToken", cascade="all, delete")
    payloads = db.relationship("Payload", cascade="all, delete")
    models = db.relationship("Model", cascade="all, delete")

    def __init__(self, name, description, admin, created_by):
        Entity.__init__(self, created_by)
        self.name = name
        self.description = description
        self.admin = admin


class GroupSchema(Schema):
    id = fields.Number()
    name = fields.Str()
    description = fields.Str()
    admin = fields.Str()
    active = fields.Boolean()
    created_at = fields.DateTime()
    created_by = fields.Str()
    updated_at = fields.DateTime()
    updated_by = fields.Str()
