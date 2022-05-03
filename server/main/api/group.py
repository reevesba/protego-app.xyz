# coding=utf-8

from flask import Blueprint, request, jsonify
from server.main.models.group import Group, GroupSchema
from server.main.models.group_member import GroupMember, GroupMemberSchema
from server.main.services.group_service import GroupService
from server.main.services.group_member import GroupMemberService
from server.main.utils.decorators import (
    requires_role, requires_group_role, requires_isuser
)
from server.main import db
from datetime import datetime

route = Blueprint('group', __name__)

group_service = GroupService()
group_member_service = GroupMemberService()


@route.route("/api/groups", methods=['GET'])
@requires_role(['admin'])
def get_groups():
    return group_service.all()


@route.route("/api/groups/user-groups/<username>", methods=['GET'])
@requires_isuser()
def get_user_groups(username):
    # First, get all group ids where user is member
    group_ids = db.session.query(GroupMember.group_id) \
                          .filter_by(username=username) \
                          .all()
    group_ids = [r.group_id for r in group_ids]

    # Next get all groups with selected group ids
    groups = db.session.query(Group).filter(Group.id.in_(group_ids)).all()
    data_dict = [row.as_dict() for row in groups]
    return jsonify(data_dict)


@route.route('/api/groups/group-members/<groupId>', methods=['GET'])
@requires_group_role(['g_member', 'g_admin'])
def get_group_members(groupId):
    group_members = db.session.query(GroupMember) \
                              .filter_by(group_id=groupId) \
                              .all()
    data_dict = [row.as_dict() for row in group_members]
    return jsonify(data_dict)


@route.route('/api/groups', methods=['POST'])
@requires_role(['member', 'admin'])
def add_group():
    post_data = GroupSchema(only=(
        'name',
        'description',
        'admin',
        'created_by'
    )).load(request.get_json())
    group = Group(
        post_data['name'],
        post_data['description'],
        post_data['admin'],
        post_data['created_by']
    )
    group = group_service.save(group)

    # Whenever a new group is added,
    # make the creator a member
    member = GroupMember(
        group.id,
        group.created_by,
        group.created_by,
        group.created_by
    )
    group_member_service.save(member)

    return post_data, 201


@route.route('/api/groups/group-members', methods=['POST'])
@requires_group_role(['g_admin'])
def add_group_member():
    post_data = GroupMemberSchema(only=(
        'group_id',
        'admin',
        'username',
        'created_by'
    )).load(request.get_json())
    member = GroupMember(
        post_data['group_id'],
        post_data['admin'],
        post_data['username'],
        post_data['created_by']
    )
    group_member_service.save(member)

    return post_data, 201


@route.route('/api/groups/<groupId>', methods=['PUT'])
@requires_group_role(['g_admin'])
def update_group(groupId):
    post_data = GroupSchema(only=(
        'name',
        'description',
        'admin',
        'updated_by'
    )).load(request.get_json())
    group = db.session.query(Group).filter_by(id=groupId).first()

    group.name = post_data['name']
    group.description = post_data['description']
    group.admin = post_data['admin']
    group.updated_by = post_data['updated_by']
    group.updated_at = datetime.utcnow()

    group_service.save(group)
    return post_data, 201


@route.route('/api/groups/group-members/<memberId>', methods=['PUT'])
@requires_group_role(['g_admin'])
def update_group_member(memberId):
    post_data = GroupMemberSchema(only=(
        'group_id',
        'admin',
        'username',
        'updated_by'
    )).load(request.get_json())
    member = db.session.query(GroupMember).filter_by(id=memberId).first()

    member.group_id = post_data['group_id']
    member.admin = post_data['admin']
    member.username = post_data['username']
    member.updated_by = post_data['updated_by']
    member.updated_at = datetime.utcnow()

    group_member_service.save(member)
    return post_data, 201


@route.route('/api/groups/<groupId>', methods=['DELETE'])
@requires_group_role(['g_admin'])
def delete_group(groupId):
    group = db.session.query(Group).filter_by(id=groupId).first()
    group_service.delete(group)
    return {'status': 'success', 'message': 'group deleted'}, 201


@route.route('/api/groups/group-members/<memberId>', methods=['DELETE'])
@requires_group_role(['admin'])
def delete_group_member(memberId):
    member = db.session.query(GroupMember).filter_by(id=memberId).first()
    group_member_service.delete(member)
    return {'status': 'success', 'message': 'member deleted'}, 201
