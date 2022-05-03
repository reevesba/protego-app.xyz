# coding=utf-8

from flask import Blueprint, request
from server.main.models.role import Role, RoleSchema
from server.main.services.role_service import RoleService
from server.main.utils.decorators import requires_role
from server.main import db
from datetime import datetime

route = Blueprint('role', __name__)

role_service = RoleService()


@route.route("/api/roles", methods=['GET'])
@requires_role(['admin'])
def get_roles():
    return role_service.all()


@route.route('/api/roles', methods=['POST'])
@requires_role(['admin'])
def add_role():
    post_data = RoleSchema(only=(
        'name',
        'description',
        'created_by'
    )).load(request.get_json())
    role = Role(
        post_data['name'],
        post_data['description'],
        post_data['created_by']
    )
    role_service.save(role)
    return post_data, 201


@route.route('/api/roles/<roleId>', methods=['PUT'])
@requires_role(['admin'])
def update_role(roleId):
    post_data = RoleSchema(only=(
        'name',
        'description',
        'updated_by'
    )).load(request.get_json())
    role = db.session.query(Role).filter_by(id=roleId).first()

    role.name = post_data['name']
    role.description = post_data['description']
    role.updated_by = post_data['updated_by']
    role.updated_at = datetime.utcnow()

    role_service.save(role)
    return post_data, 201


@route.route('/api/roles/<roleId>', methods=['DELETE'])
@requires_role(['admin'])
def delete_role(roleId):
    role = db.session.query(Role).filter_by(id=roleId).first()
    role_service.delete(role)
    return {'status': 'success', 'message': 'role deleted'}, 201
