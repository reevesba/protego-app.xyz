# coding=utf-8

from flask import Blueprint, request, jsonify
from server.main.models.api_token import ApiToken, ApiTokenSchema
from server.main.services.api_token_service import ApiTokenService
from server.main.utils.jwt_utils import encode_auth_token_date
from server.main.utils.decorators import requires_group_role
from server.main import db
from datetime import datetime

route = Blueprint('api_token', __name__)

api_token_service = ApiTokenService()


@route.route("/api/api-token/<groupId>", methods=['GET'])
@requires_group_role(['g_member', 'g_admin'])
def get_api_tokens(groupId):
    api_tokens = db.session.query(ApiToken).filter_by(group_id=groupId).all()
    data_dict = [row.as_dict() for row in api_tokens]
    return jsonify(data_dict)


@route.route('/api/api-token', methods=['POST'])
@requires_group_role(['g_admin'])
def add_api_token():
    post_data = ApiTokenSchema(only=(
        'group_id',
        'expiration',
        'api_key',
        'created_by'
    )).load(request.get_json())

    api_token = ApiToken(
        post_data['group_id'],
        post_data['expiration'],
        post_data['api_key'],
        post_data['created_by']
    )
    api_token.api_key = encode_auth_token_date(
        api_token.group_id,
        api_token.expiration
    )

    api_token_service.save(api_token)
    return post_data, 201


@route.route('/api/api-token/<apiTokenId>', methods=['PUT'])
@requires_group_role(['g_admin'])
def update_api_token(apiTokenId):
    post_data = ApiTokenSchema(only=(
        'group_id',
        'api_key',
        'expiration',
        'created_by'
    )).load(request.get_json())
    api_token = db.session.query(ApiToken).filter_by(id=apiTokenId).first()

    api_token.group_id = post_data['group_id']
    api_token.api_key = post_data['api_key']
    api_token.expiration = post_data['expiration']
    api_token.updated_by = post_data['updated_by']
    api_token.updated_at = datetime.utcnow()

    api_token_service.save(api_token)
    return post_data, 201


@route.route('/api/api-token/<apiTokenId>', methods=['DELETE'])
@requires_group_role(['g_admin'])
def delete_api_token(apiTokenId):
    api_token = db.session.query(ApiToken).filter_by(id=apiTokenId).first()
    api_token_service.delete(api_token)
    return {'status': 'success', 'message': 'api deleted'}, 201
