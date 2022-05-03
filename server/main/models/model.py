# coding=utf-8

from sqlalchemy import Column, String, Integer, LargeBinary
from .entity import Entity
from marshmallow import Schema, fields
from server.main import db


class Model(Entity, db.Model):
    __tablename__ = "model"

    group_id = Column(Integer(), db.ForeignKey('group.id'), index=True)
    algorithm = Column(String(50))
    name = Column(String(50))
    data = Column(LargeBinary())

    def __init__(self, group_id, algorithm, name, data, created_by):
        Entity.__init__(self, created_by)
        self.group_id = group_id
        self.algorithm = algorithm
        self.name = name
        self.data = data


class ModelSchema(Schema):
    id = fields.Number()
    group_id = fields.Number()
    algorithm = fields.Str()
    active = fields.Boolean()
    name = fields.Str()
    data = fields.Raw()
    created_at = fields.DateTime()
    created_by = fields.Str()
    updated_at = fields.DateTime()
    updated_by = fields.Str()
