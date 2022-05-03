# coding=utf-8

from sqlalchemy import Column, String, Integer
from .entity import Entity
from marshmallow import Schema, fields
from server.main import db


class Payload(Entity, db.Model):
    __tablename__ = "payload"

    group_id = Column(Integer(), db.ForeignKey('group.id'), index=True)
    payload = Column(String())
    classification = Column(String(100))

    def __init__(self, group_id, payload, classification, created_by):
        Entity.__init__(self, created_by)
        self.group_id = group_id
        self.payload = payload
        self.classification = classification


class PayloadSchema(Schema):
    id = fields.Number()
    active = fields.Boolean()
    group_id = fields.Number()
    payload = fields.Str()
    classification = fields.Str()
    created_at = fields.DateTime()
    created_by = fields.Str()
    updated_at = fields.DateTime()
    updated_by = fields.Str()
