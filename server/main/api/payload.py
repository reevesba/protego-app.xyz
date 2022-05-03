# coding=utf-8

from flask import Blueprint, request, jsonify
from server.main.models.payload import Payload, PayloadSchema
from server.main.services.payload_service import PayloadService
from server.main.utils.decorators import requires_group_role
from server.main import db
from datetime import datetime

# Protego imports
from protego.utils.data_loader import DataLoader

route = Blueprint('payload', __name__)

payload_service = PayloadService()


@route.route("/api/payloads/loader/<groupId>", methods=['GET'])
@requires_group_role(['g_member', 'g_admin'])
def load_payloads(groupId):
    # Init necessary tools
    data_loader = DataLoader()
    dataset = data_loader.load()

    # Iterate dataframe creating new Payload objects
    payloads = []
    for index, row in dataset.iterrows():
        payloads.append(Payload(
            groupId,
            row['payload'],
            row['label'],
            'protego-app'
        ))

    payload_service.save_bulk(payloads)
    return {'status': 'success', 'message': 'payload loaded'}, 201


@route.route("/api/payloads/<groupId>/<pageSize>/<pageIndex>", methods=['GET'])
@requires_group_role(['g_member', 'g_admin'])
def get_group_payloads(groupId, pageSize, pageIndex):
    pageSize = int(pageSize)
    pageIndex = int(pageIndex)

    # Get total count
    payload_count = db.session.query(Payload.id) \
                              .filter_by(group_id=groupId) \
                              .count()

    # Get items for page
    group_payloads = db.session.query(Payload).filter_by(group_id=groupId) \
        .order_by(Payload.id) \
        .limit(pageSize) \
        .offset(pageSize*pageIndex)

    data_dict = [row.as_dict() for row in group_payloads]
    data_dict.append(payload_count)

    return jsonify(data_dict), 201


@route.route('/api/payloads', methods=['POST'])
@requires_group_role(['g_member', 'g_admin'])
def add_payload():
    post_data = PayloadSchema(only=(
        'group_id',
        'payload',
        'classification',
        'created_by'
    )).load(request.get_json())
    payload = Payload(
        post_data['group_id'],
        post_data['payload'],
        post_data['classification'],
        post_data['created_by']
    )
    payload_service.save(payload)
    return post_data, 201


@route.route('/api/payloads/<payloadId>', methods=['PUT'])
@requires_group_role(['g_member', 'g_admin'])
def update_payload(payloadId):
    post_data = PayloadSchema(only=(
        'payload',
        'classification',
        'updated_by'
    )).load(request.get_json())
    payload = db.session.query(Payload).filter_by(id=payloadId).first()

    payload.payload = post_data['payload']
    payload.classification = post_data['classification']
    payload.updated_by = post_data['updated_by']
    payload.updated_at = datetime.utcnow()

    payload_service.save(payload)
    return post_data, 201


@route.route('/api/payloads/<payloadId>', methods=['DELETE'])
@requires_group_role(['g_member', 'g_admin'])
def delete_payload(payloadId):
    payload = db.session.query(Payload).filter_by(id=payloadId).first()
    payload_service.delete(payload)
    return {'status': 'success', 'message': 'payload deleted'}, 201
