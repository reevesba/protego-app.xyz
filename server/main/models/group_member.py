# coding=utf-8

from sqlalchemy import Column, Integer, String
from .entity import Entity
from marshmallow import Schema, fields
from server.main import db


class GroupMember(Entity, db.Model):
    __tablename__ = "group_member"

    group_id = Column(Integer(), db.ForeignKey('group.id'), index=True)
    admin = Column(String(128))
    username = Column(String(128))

    def __init__(self, group_id, admin, username, created_by):
        Entity.__init__(self, created_by)
        self.group_id = group_id
        self.admin = admin
        self.username = username
        self.active = True


class GroupMemberSchema(Schema):
    id = fields.Number()
    active = fields.Boolean()
    group_id = fields.Integer()
    admin = fields.Str()
    username = fields.Str()
    created_at = fields.DateTime()
    created_by = fields.Str()
    updated_at = fields.DateTime()
    updated_by = fields.Str()
