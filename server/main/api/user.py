# coding=utf-8

import os
import base64
import imghdr
from flask import Blueprint, request, jsonify, make_response, current_app
from marshmallow import EXCLUDE
from werkzeug.utils import secure_filename
from server.main.models.user import User, UserSchema
from server.main.models.role import Role
from server.main.models.user_role import UserRoles, UserRolesSchema
from server.main.services.user_service import UserService
from server.main.services.user_roles_service import UserRolesService
from server.main.utils.decorators import requires_role, requires_isuser
from server.main.utils.email_confirmation.email_conf_utils import confirm_token
from server.main import db
from datetime import datetime

route = Blueprint('user_account', __name__)

user_service = UserService()
user_roles_service = UserRolesService()


@route.route("/api/users", methods=['GET'])
@requires_role(['admin'])
def get_users():
    return user_service.all()


@route.route("/api/users/<username>", methods=['GET'])
@requires_isuser()
def get_user(username):
    user = db.session.query(User).filter_by(username=username).first()
    return jsonify(user.as_dict()), 201


@route.route("/api/users/email/<token>", methods=['GET'])
def get_username(token):
    email = confirm_token(token)

    if email is False:
        return error_response('reset link is invalid or has expired')

    user = User.query.filter_by(email=email).first_or_404()
    return jsonify({'username': user.username}), 201


@route.route("/api/users/photo/<username>", methods=['GET'])
@requires_isuser()
def get_user_photo(username):
    user = db.session.query(User).filter_by(username=username).first()
    with open('server/main/' + user.photo_url, 'rb') as f:
        response = make_response(base64.b64encode(f.read()))
        response.headers.set('Content-Type', 'image/gif')
        response.headers.set(
            'Content-Disposition',
            'attachment',
            filename='image.gif'
        )
        return response


@route.route('/api/users/photo/<username>', methods=['PUT'])
@requires_isuser()
def update_user_photo(username):
    if not request.files:
        return error_response('no file found')

    uploaded_file = request.files['file']
    filename = secure_filename(uploaded_file.filename)
    if filename == '':
        return error_response('filename invalid')

    file_ext = os.path.splitext(filename)[1]
    if (
        file_ext not in current_app.config['UPLOAD_EXTENSIONS']
        or file_ext != validate_image(uploaded_file.stream)
    ):
        return error_response('file extension invalid')

    # save to server
    uploaded_file.save(
        os.path.join(current_app.config['UPLOAD_PATH'], username + file_ext)
    )

    # update user_account
    user = db.session.query(User).filter_by(username=username).first()
    user.photo_url = 'static/profile_photos/' + username + file_ext
    user_service.save(user)
    return success_response('photo updated')


@route.route('/api/users', methods=['PUT'])
@requires_isuser()
def update_user():
    put_data = UserSchema(only=(
        'id',
        'first_name',
        'last_name',
        'updated_by'
    ), unknown=EXCLUDE).load(request.get_json())
    user = db.session.query(User).filter_by(id=put_data['id']).first()
    user.first_name = put_data['first_name']
    user.last_name = put_data['last_name']
    user.updated_by = put_data['updated_by']
    user.updated_at = datetime.utcnow()
    user_service.save(user)
    return put_data, 201


@route.route("/api/users", methods=['POST'])
@requires_role(['admin'])
def delete_user():
    pass


@route.route("/api/users/roles", methods=['GET'])
@requires_role(['admin'])
def get_users_with_roles():
    data = db.session.query(User, Role.id, Role.name, UserRoles.user_id) \
                     .outerjoin(UserRoles, UserRoles.user_id == User.id) \
                     .outerjoin(Role, UserRoles.role_id == Role.id) \
                     .all()

    response = []
    for row in data:
        user_data = row[0].as_dict()
        user_data['role_id'] = row[1]
        user_data['role'] = row[2]
        user_data['user_id'] = row[3]
        response.append(user_data)

    return jsonify(response), 201


@route.route("/api/users/roles", methods=['POST'])
@requires_role(['admin'])
def assign_role():
    post_data = UserRolesSchema(only=(
        'user_id',
        'role_id',
        'updated_by'
    )).load(request.get_json())
    user_role_object = db.session.query(UserRoles) \
                                 .filter_by(user_id=post_data['user_id']) \
                                 .first()

    if user_role_object:
        user_role = user_role_object
        user_role.role_id = post_data['role_id']
        user_role.updated_by = post_data['updated_by']
        user_role.updated_at = datetime.utcnow()
    else:
        user_role = UserRoles(
            post_data['user_id'],
            post_data['role_id'],
            post_data['updated_by']
        )

    user_roles_service.save(user_role)
    return post_data, 201


@route.route("/api/users/roles/<userId>", methods=['DELETE'])
@requires_role(['admin'])
def remove_role(userId):
    user_role = db.session.query(UserRoles).filter_by(user_id=userId).first()
    user_roles_service.delete(user_role)
    return {'status': 'success', 'message': 'role removed'}, 201


def validate_image(stream):
    header = stream.read(512)
    stream.seek(0)
    format = imghdr.what(None, header)
    if not format:
        return None
    return '.' + (format if format != 'jpeg' else 'jpg')


def error_response(message):
    response = {'status': 'fail', 'message': message}
    return make_response(jsonify(response)), 401


def success_response(message):
    response = {'status': 'success', 'message': message}
    return make_response(jsonify(response)), 201
