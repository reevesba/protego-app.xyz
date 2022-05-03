# coding=utf-8

from sqlalchemy import Column, String, DateTime, Integer
from .entity import Entity
from marshmallow import Schema, fields
from server.main import db


class ApiToken(Entity, db.Model):
    __tablename__ = "api_token"

    group_id = Column(Integer(), db.ForeignKey('group.id'), index=True)
    expiration = Column(DateTime())
    api_key = Column(String())

    def __init__(self, group_id, expiration, api_key, created_by):
        Entity.__init__(self, created_by)
        self.group_id = group_id
        self.expiration = expiration
        self.api_key = api_key


class ApiTokenSchema(Schema):
    id = fields.Number()
    active = fields.Boolean()
    group_id = fields.Number()
    expiration = fields.DateTime()
    api_key = fields.Str()
    created_at = fields.DateTime()
    created_by = fields.Str()
    updated_at = fields.DateTime()
    updated_by = fields.Str()
