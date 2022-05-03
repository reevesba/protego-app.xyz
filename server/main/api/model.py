# coding=utf-8

import pickle
import json
import pandas as pd
from flask import Blueprint, request, jsonify
from server.main.models.model import Model, ModelSchema
from server.main.models.payload import Payload
from server.main.services.model_service import ModelService
from server.main.services.payload_service import PayloadService
from server.main.utils.decorators import requires_group_role
from server.main.utils.parameter_validator import ModelValidator
from server.main import db
from datetime import datetime
from sklearn.metrics import accuracy_score

# Protego imports
from protego.models.batch import (
    DecisionTree, KNeighbors, LogisticRegressionClassifier,
    NaiveBayes, PerceptronClassifier, RandomForest
)
from protego.models.online import (
    HoeffdingAdaptiveTree, KNNADWIN, LogisticRegressionClassifier as LROnline,
    NaiveBayes as NBOnline, PerceptronClassifier as PerOnline,
    AdaptiveRandomForest
)
from protego.utils.feature_extractor import FeatureExtractor

route = Blueprint('model', __name__)

model_service = ModelService()
payload_service = PayloadService()


def stringify_params(params):
    for k, v in params.items():
        if isinstance(v, tuple):
            params[k] = v[0].__name__
        elif isinstance(v, type):
            params[k] = v.__name__
        elif isinstance(v, dict):
            params[k] = json.dumps(v)
        else:
            params[k] = v
    return params


@route.route("/api/model/<groupId>", methods=['GET'])
@requires_group_role(['g_member', 'g_admin'])
def get_group_models(groupId):
    group_models = db.session.query(Model).filter_by(group_id=groupId).all()
    data_dict = [row.as_dict() for row in group_models]

    # Can't jsonify binary data, so just remove it
    for row in data_dict:
        row['data'] = None

    return jsonify(data_dict)


@route.route("/api/model/parameters/<modelId>", methods=['GET'])
@requires_group_role(['g_member', 'g_admin'])
def get_parameters(modelId):
    # First, load the model
    model = db.session.query(Model).filter_by(id=modelId).first()
    classifier = pickle.loads(model.data)

    # Finally, return parameters
    if model.algorithm.endswith('b'):
        params = classifier.model.get_params()
    elif model.algorithm.endswith('o'):
        params = classifier.model._get_params()
    else:
        params = "Error: model algorithm must end with 'b' or 'o'."

    return stringify_params(params), 201


@route.route('/api/model', methods=['POST'])
@requires_group_role(['g_member', 'g_admin'])
def add_model():
    try:
        post_data = request.get_json()
        post_data['data'] = ''
        load_data = [
            "group_id",
            "algorithm",
            "name",
            "data",
            "created_by"
        ]
        load_data = {
            key: val for key, val in post_data.items() if key in load_data
        }
        load_data = ModelSchema(only=(
            'group_id',
            'algorithm',
            'name',
            'data',
            'created_by'
        )).load(load_data)

        validator = ModelValidator(post_data)
        match load_data.get('algorithm'):
            case 'knnb':
                param = validator.clean_knnb()
                classifier = KNeighbors(
                    n_neighbors=param['n_neighbors'],
                    weights=param['weights'],
                    algorithm=param['algorithm'],
                    leaf_size=param['leaf_size'],
                    p=param['p'],
                    metric=param['metric'],
                    metric_params=param['metric_params'],
                    n_jobs=param['n_jobs']
                )
            case 'knno':
                param = validator.clean_knno()
                classifier = KNNADWIN(
                    n_neighbors=param['n_neighbors'],
                    window_size=param['window_size'],
                    leaf_size=param['leaf_size'],
                    p=param['p']
                )
            case 'logb':
                param = validator.clean_logb()
                classifier = LogisticRegressionClassifier(
                    penalty=param['penalty'],
                    dual=param['dual'],
                    tol=param['tol'],
                    C=param['C'],
                    fit_intercept=param['fit_intercept'],
                    intercept_scaling=param['intercept_scaling'],
                    class_weight=param['class_weight'],
                    random_state=param['random_state'],
                    solver=param['solver'],
                    max_iter=param['max_iter'],
                    multi_class=param['multi_class'],
                    verbose=param['verbose'],
                    warm_start=param['warm_start'],
                    n_jobs=param['n_jobs'],
                    l1_ratio=param['l1_ratio']
                )
            case 'logo':
                param = validator.clean_logo()
                classifier = LROnline(
                    optimizer=param['optimizer'],
                    loss=param['loss'],
                    l2=param['l2'],
                    intercept_init=param['intercept_init'],
                    intercept_lr=param['intercept_lr'],
                    clip_gradient=param['clip_gradient'],
                    initializer=param['initializer']
                )
            case 'mnbb':
                param = validator.clean_mnbb()
                classifier = NaiveBayes(
                    alpha=param['alpha'],
                    fit_prior=param['fit_prior'],
                    class_prior=param['class_prior']
                )
            case 'mnbo':
                param = validator.clean_mnbo()
                classifier = NBOnline(
                    alpha=param['alpha']
                )
            case 'perb':
                param = validator.clean_perb()
                classifier = PerceptronClassifier(
                    penalty=param['penalty'],
                    alpha=param['alpha'],
                    l1_ratio=param['l1_ratio'],
                    fit_intercept=param['fit_intercept'],
                    max_iter=param['max_iter'],
                    tol=param['tol'],
                    shuffle=param['shuffle'],
                    verbose=param['verbose'],
                    eta0=param['eta0'],
                    n_jobs=param['n_jobs'],
                    random_state=param['random_state'],
                    early_stopping=param['early_stopping'],
                    validation_fraction=param['validation_fraction'],
                    n_iter_no_change=param['n_iter_no_change'],
                    class_weight=param['class_weight'],
                    warm_start=param['warm_start']
                )
            case 'pero':
                param = validator.clean_pero()
                classifier = PerOnline(
                    l2=param['l2'],
                    clip_gradient=param['clip_gradient'],
                    initializer=param['initializer']
                )
            case 'ranb':
                param = validator.clean_ranb()
                classifier = RandomForest(
                    n_estimators=param['n_estimators'],
                    criterion=param['criterion'],
                    max_depth=param['max_depth'],
                    min_samples_split=param['min_samples_split'],
                    min_samples_leaf=param['min_samples_leaf'],
                    min_weight_fraction_leaf=param['min_weight_fraction_leaf'],
                    max_features=param['max_features'],
                    max_leaf_nodes=param['max_leaf_nodes'],
                    min_impurity_decrease=param['min_impurity_decrease'],
                    bootstrap=param['bootstrap'],
                    oob_score=param['oob_score'],
                    n_jobs=param['n_jobs'],
                    random_state=param['random_state'],
                    verbose=param['verbose'],
                    warm_start=param['warm_start'],
                    class_weight=param['class_weight'],
                    ccp_alpha=param['ccp_alpha'],
                    max_samples=param['max_samples']
                )
            case 'rano':
                param = validator.clean_rano()
                classifier = AdaptiveRandomForest(
                    n_models=param['n_models'],
                    max_features=param['max_features'],
                    lambda_value=param['lambda_value'],
                    metric=param['metric'],
                    disable_weighted_vote=param['disable_weighted_vote'],
                    drift_detector=param['drift_detector'],
                    warning_detector=param['warning_detector'],
                    grace_period=param['grace_period'],
                    max_depth=param['max_depth'],
                    split_criterion=param['split_criterion'],
                    split_confidence=param['split_confidence'],
                    tie_threshold=param['tie_threshold'],
                    leaf_prediction=param['leaf_prediction'],
                    nb_threshold=param['nb_threshold'],
                    nominal_attributes=param['nominal_attributes'],
                    splitter=param['splitter'],
                    binary_split=param['binary_split'],
                    max_size=param['max_size'],
                    memory_estimate_period=param['memory_estimate_period'],
                    stop_mem_management=param['stop_mem_management'],
                    remove_poor_attrs=param['remove_poor_attrs'],
                    merit_preprune=param['merit_preprune'],
                    seed=param['seed']
                )
            case 'treb':
                param = validator.clean_treb()
                classifier = DecisionTree(
                    criterion=param['criterion'],
                    splitter=param['splitter'],
                    max_depth=param['max_depth'],
                    min_samples_split=param['min_samples_split'],
                    min_samples_leaf=param['min_samples_leaf'],
                    min_weight_fraction_leaf=param['min_weight_fraction_leaf'],
                    max_features=param['max_features'],
                    random_state=param['random_state'],
                    max_leaf_nodes=param['max_leaf_nodes'],
                    min_impurity_decrease=param['min_impurity_decrease'],
                    class_weight=param['class_weight'],
                    ccp_alpha=param['ccp_alpha']
                )
            case 'treo':
                param = validator.clean_treo()
                classifier = HoeffdingAdaptiveTree(
                    grace_period=param['grace_period'],
                    max_depth=param['max_depth'],
                    split_criterion=param['split_criterion'],
                    split_confidence=param['split_confidence'],
                    tie_threshold=param['tie_threshold'],
                    leaf_prediction=param['leaf_prediction'],
                    nb_threshold=param['nb_threshold'],
                    nominal_attributes=param['nominal_attributes'],
                    splitter=param['splitter'],
                    bootstrap_sampling=param['bootstrap_sampling'],
                    drift_window_threshold=param['drift_window_threshold'],
                    adwin_confidence=param['adwin_confidence'],
                    binary_split=param['binary_split'],
                    max_size=param['max_size'],
                    memory_estimate_period=param['memory_estimate_period'],
                    stop_mem_management=param['stop_mem_management'],
                    remove_poor_attrs=param['remove_poor_attrs'],
                    merit_preprune=param['merit_preprune'],
                    seed=param['seed']
                )
            case _:
                resp = "model not found"

        model = Model(
            load_data['group_id'],
            load_data['algorithm'],
            load_data['name'],
            load_data['data'],
            load_data['created_by']
        )
        model.data = pickle.dumps(classifier)
        model_service.save(model)

        stat, resp, code = ("success", "model created successfully", 201)

    except Exception as e:
        stat, resp, code = ("fail", str(e), 500)

    return {'status': stat, 'message': resp}, code


@route.route("/api/model/train", methods=['PUT'])
@requires_group_role(['g_member', 'g_admin'])
def train_model():
    try:
        put_data = request.get_json()

        # Load model
        model = db.session.query(Model) \
                          .filter_by(id=put_data.get('modelId')) \
                          .first()
        classifier = pickle.loads(model.data)

        # Load and transform data
        payloads = db.session.query(Payload) \
                             .filter(Payload.id.between(
                                        put_data.get('trainStart'),
                                        put_data.get('trainEnd')
                                    )) \
                             .all()
        dataset = pd.DataFrame(
            [payload.as_dict() for payload in payloads],
            columns=['payload', 'classification']
        )
        dataset.rename({'classification': 'label'}, axis=1, inplace=True)

        if dataset.shape[0] > 0:
            fe = FeatureExtractor()
            dataset = fe.transform(dataset)
            dataset.dropna(inplace=True)
            dataset.reset_index(inplace=True, drop=True)

            features = dataset.columns[:-1]
            training_set = dataset[features]
            training_lbl = dataset['label'].astype(float).astype(int)

            # Do training
            classifier.train(training_set, training_lbl)

            # Save model
            model.data = pickle.dumps(classifier)
            model.updated_by = put_data.get('updated_by')
            model.updated_at = datetime.utcnow()
            model_service.save(model)

            # Purge payloads
            if put_data.get('purgePayloads') == 1:
                for payload in payloads:
                    payload_service.delete(payload)

            stat, resp, code = ("success", "model trained successfully", 201)
        else:
            stat, resp, code = ("fail", "no data provided", 500)

    except Exception as e:
        stat, resp, code = ("fail", str(e), 500)

    return {'status': stat, 'message': resp}, code


@route.route("/api/model/test", methods=['PUT'])
@requires_group_role(['g_member', 'g_admin'])
def test_model():
    try:
        put_data = request.get_json()

        # Load model and Feature Extractor
        model = db.session.query(Model) \
                          .filter_by(id=put_data.get('modelId')) \
                          .first()

        classifier = pickle.loads(model.data)
        fe = FeatureExtractor()

        # Get dataset
        match put_data.get('sampleMode'):
            case 0:
                dataset = pd.DataFrame(
                    [[put_data.get('sample'), '0.0']],
                    columns=['payload', 'label']
                )
            case 1:
                payloads = db.session.query(Payload) \
                                    .filter(Payload.id.between(
                                                put_data.get('testStart'),
                                                put_data.get('testEnd')
                                            )) \
                                    .all()
                dataset = pd.DataFrame(
                    [payload.as_dict() for payload in payloads],
                    columns=['payload', 'classification']
                )
                dataset.rename(
                    {'classification': 'label'},
                    axis=1,
                    inplace=True
                )
            case _:
                stat, resp, code = ("fail", "invalid sample mode", 500)

        # Extract features and predict
        if dataset.shape[0] > 0:
            dataset = fe.transform(dataset)
            dataset.dropna(inplace=True)
            dataset.reset_index(inplace=True, drop=True)

            features = dataset.columns[:-1]
            test_set = dataset[features]
            test_lbl = dataset["label"].astype(float).astype(int)

            y_pred = classifier.predict(test_set)

            if y_pred.shape[0] > 1:
                acc = 100*accuracy_score(test_lbl, y_pred)
                stat, resp, code = ("success", f'Accuracy: {acc:3.3f}%', 200)
            elif y_pred.shape[0] == 1:
                match int(float(y_pred[0])):
                    case 0:
                        (stat, resp, code) = ('success', 'benign', 200)
                    case 1:
                        (stat, resp, code) = ('success', 'malicious', 200)
                    case _:
                        (stat, resp, code) = ('fail', 'class is invalid', 500)
            else:
                stat, resp, code = ("fail", "dataset shape invalid", 500)
        else:
            stat, resp, code = ("fail", "dataset is empty", 500)

    except Exception as e:
        stat, resp, code = ("fail", str(e), 500)

    return {'status': stat, 'message': resp}, code


@route.route('/api/model/<modelId>', methods=['DELETE'])
@requires_group_role(['g_member', 'g_admin'])
def delete_model(modelId):
    model = db.session.query(Model).filter_by(id=modelId).first()
    model_service.delete(model)
    return {'status': 'success', 'message': 'model deleted'}, 201
