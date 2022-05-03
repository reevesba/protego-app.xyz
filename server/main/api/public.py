# coding=utf-8

import pickle
import pandas as pd
from flask import Blueprint, request
from server.main.models.payload import Payload, PayloadSchema
from server.main.services.payload_service import PayloadService
from server.main.models.model import Model
from server.main.utils.decorators import requires_group_auth
from server.main import db
from protego.utils.feature_extractor import FeatureExtractor

route = Blueprint("public", __name__)

payload_service = PayloadService()


@route.route("/api/public/save-payload", methods=["POST"])
@requires_group_auth()
def save_payload():
    try:
        payload = save_payload_request()
        return {"status": "success", "message": payload.payload}, 200
    except Exception as e:
        return {"status": "fail", "message": str(e)}, 500


@route.route("/api/public/predict/<modelId>", methods=["POST"])
@requires_group_auth()
def predict(modelId):
    try:
        # Save/load payload
        payload = save_payload_request()

        # Load model and Feature Extractor
        model = db.session.query(Model) \
                          .filter_by(id=modelId) \
                          .first()

        classifier = pickle.loads(model.data)
        fe = FeatureExtractor()

        sample = pd.DataFrame(
            [[payload.payload, "0.0"]],
            columns=["payload", "label"]
        )

        # Extract features and predict
        if sample.shape[0] > 0:
            sample = fe.transform(sample)
            y_pred = classifier.predict(sample[sample.columns[:-1]])[0]
            y_pred = int(float(y_pred))

            # Update payload in db
            payload.classification = y_pred
            db.session.commit()

            classes = ["benign", "malicious"]
            stat, resp, code = ("success", classes[y_pred], 200)
        else:
            stat, resp, code = ("fail", "no sample provided", 500)

    except Exception as e:
        stat, resp, code = ("fail", str(e), 500)

    return {'status': stat, 'message': resp}, code


def save_payload_request():
    post_data = PayloadSchema(only=(
        "group_id",
        "payload",
        "classification",
        "created_by"
    )).load(request.get_json())
    payload = Payload(
        post_data["group_id"],
        post_data["payload"],
        post_data["classification"],
        post_data["created_by"]
    )
    return payload_service.save(payload)
