# coding=utf-8

from sqlalchemy import Column, Integer
from .entity import Entity
from marshmallow import Schema, fields
from server.main import db


class UserRoles(Entity, db.Model):
    __tablename__ = "user_role"

    user_id = Column(
        Integer(),
        db.ForeignKey('user_account.id', ondelete='CASCADE')
    )
    role_id = Column(
        Integer(),
        db.ForeignKey('role.id', ondelete='CASCADE')
    )

    def __init__(self, user_id, role_id, created_by):
        Entity.__init__(self, created_by)
        self.user_id = user_id
        self.role_id = role_id
        self.active = True


class UserRolesSchema(Schema):
    id = fields.Number()
    active = fields.Boolean()
    user_id = fields.Integer()
    role_id = fields.Integer()
    created_at = fields.DateTime()
    created_by = fields.Str()
    updated_at = fields.DateTime()
    updated_by = fields.Str()
