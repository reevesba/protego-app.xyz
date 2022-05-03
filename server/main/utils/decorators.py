from functools import wraps
from flask import request, make_response, jsonify
from server.main import db
from server.main.models.user_role import UserRoles
from server.main.models.role import Role
from server.main.models.user import User
from server.main.models.api_token import ApiToken
from server.main.models.group import Group
from server.main.models.group_member import GroupMember
from server.main.models.model import Model
from server.main.models.payload import Payload
from server.main.utils.jwt_utils import decode_auth_token


def requires_auth():
    def wrapper(func):
        @wraps(func)
        def decorator(*args, **kwargs):
            # get auth token
            auth_token = get_auth_token()

            if auth_token:
                user_id = decode_auth_token(auth_token)

                if not isinstance(user_id, str):
                    return func(*args, **kwargs)

                return error_response(user_id)
            else:
                return error_response('invalid token provided')

        return decorator
    return wrapper


def requires_role(required_roles):
    def wrapper(func):
        @wraps(func)
        def decorator(*args, **kwargs):
            # get auth token
            auth_token = get_auth_token()

            if auth_token:
                user_id = decode_auth_token(auth_token)
                if not isinstance(user_id, str):
                    # get the role name
                    user_role = Role.query.with_entities(Role.name) \
                        .join(UserRoles, UserRoles.role_id == Role.id) \
                        .filter(UserRoles.user_id == user_id) \
                        .first()[0]

                    if user_role in required_roles:
                        return func(*args, **kwargs)
                    return error_response('access denied')
                return error_response(user_id)
            else:
                return error_response('invalid token provided')

        return decorator
    return wrapper


def requires_group_role(group_roles):
    def wrapper(func):
        @wraps(func)
        def decorator(*args, **kwargs):
            api_token_id = None
            group_member_id = None
            model_id = None
            payload_id = None

            if request.method == "POST":
                group_id = request.get_json().get("group_id", None)

            if request.method == "PUT":
                group_id = request.get_json().get("groupId", None)
                api_token_id = kwargs.get("apiTokenId", None)
                group_member_id = kwargs.get("memberId", None)
                model_id = kwargs.get("modelId", None)
                payload_id = kwargs.get("payloadId", None)

            if request.method in ["GET", "DELETE"]:
                group_id = kwargs.get("groupId", None)
                api_token_id = kwargs.get("apiTokenId", None)
                group_member_id = kwargs.get("memberId", None)
                model_id = kwargs.get("modelId", None)
                payload_id = kwargs.get("payloadId", None)

                if group_id in [0, "0"]:
                    return func(*args, **kwargs)

            auth_token = get_auth_token()

            if auth_token:
                user_id = decode_auth_token(auth_token)
                username = db.session.query(User.username) \
                                     .filter_by(id=user_id) \
                                     .scalar()

                if not isinstance(user_id, str):
                    # Get associated group if apiTokenId is provided
                    if group_id is None and api_token_id is not None:
                        group_id = ApiToken.query \
                                           .with_entities(ApiToken.group_id) \
                                           .filter_by(id=api_token_id) \
                                           .scalar()

                    # Get associated group if memberId is provided
                    if group_id is None and group_member_id is not None:
                        group_id = GroupMember.query \
                                              .with_entities(
                                                  GroupMember.group_id
                                                ) \
                                              .filter_by(id=group_member_id) \
                                              .scalar()

                    # Get associated group if modelId is provided
                    if group_id is None and model_id is not None:
                        group_id = Model.query \
                                              .with_entities(Model.group_id) \
                                              .filter_by(id=model_id) \
                                              .scalar()

                    # Get associated group if payloadId is provided
                    if group_id is None and payload_id is not None:
                        group_id = Payload.query \
                                              .with_entities(
                                                  Payload.group_id
                                                ) \
                                              .filter_by(id=payload_id) \
                                              .scalar()

                    # Check if user is group member
                    group_member = db.session.query(
                        db.exists().where(db.and_(
                            GroupMember.group_id == group_id,
                            GroupMember.username == username
                        ))
                    ).scalar()

                    # Check if user is group admin
                    group_admin = db.session.query(
                        db.exists().where(db.and_(
                            GroupMember.group_id == group_id,
                            GroupMember.admin == username
                        ))
                    ).scalar()

                    if group_admin and 'g_admin' in group_roles:
                        return func(*args, **kwargs)

                    if group_member and 'g_member' in group_roles:
                        return func(*args, **kwargs)

                    return error_response('access denied')
                return error_response(user_id)
            else:
                return error_response('invalid token provided')
        return decorator
    return wrapper


def requires_isuser():
    def wrapper(func):
        @wraps(func)
        def decorator(*args, **kwargs):
            if request.method in ["POST", "PUT"]:
                username = request.get_json().get("username", None)

            if request.method in ["GET", "DELETE"]:
                username = kwargs.get("username", None)

                if username in [None, ""]:
                    return func(*args, **kwargs)

            auth_token = get_auth_token()

            if auth_token:
                user_id = decode_auth_token(auth_token)
                username_token = db.session.query(User.username) \
                                   .filter_by(id=user_id) \
                                   .scalar()

                if not isinstance(user_id, str):
                    if username_token == username:
                        return func(*args, **kwargs)

                    return error_response('access denied')
                return error_response(user_id)
            else:
                return error_response('invalid token provided')
        return decorator
    return wrapper


def requires_group_auth():
    def wrapper(func):
        @wraps(func)
        def decorator(*args, **kwargs):
            group_id = request.get_json()["group_id"]
            auth_token = get_auth_token()

            if auth_token:
                decoded = decode_auth_token(auth_token)

                if not isinstance(decoded, str):
                    # Ensure group is valid
                    group_exists = db.session.query(
                            db.exists().where(
                                Group.id == group_id
                            )).scalar()

                    if not group_exists:
                        return error_response("Group ID is invalid")

                    if group_id != decoded:
                        return error_response("Group ID doesn't match token")

                    return func(*args, **kwargs)
                else:
                    return error_response(group_id)
            else:
                return error_response('invalid token provided')
        return decorator
    return wrapper


def get_auth_token():
    auth_header = request.headers.get('Authorization')
    auth_token = None

    if auth_header:
        try:
            auth_token = auth_header.split(" ")[1]
        except IndexError:
            return auth_token
    return auth_token


def error_response(message):
    response = {
        'status': 'fail',
        'message': message
    }
    return make_response(jsonify(response)), 401
