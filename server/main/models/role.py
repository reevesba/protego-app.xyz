# coding=utf-8

from sqlalchemy import Column, String
from .entity import Entity
from marshmallow import Schema, fields
from server.main import db


class Role(Entity, db.Model):
    __tablename__ = "role"

    name = Column(String(50), unique=True)
    description = Column(String(100))

    def __init__(self, name, description, created_by):
        Entity.__init__(self, created_by)
        self.name = name
        self.description = description


class RoleSchema(Schema):
    id = fields.Number()
    active = fields.Boolean()
    name = fields.Str()
    description = fields.Str()
    created_at = fields.DateTime()
    created_by = fields.Str()
    updated_at = fields.DateTime()
    updated_by = fields.Str()
