# -*- coding: utf-8 -*-

""" Main application package
"""

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_mail import Mail

from server.main.utils.common import register_blueprints
from server.settings import config

# instantiate db, bcrypt, and mail
db = SQLAlchemy()
bcrypt = Bcrypt()
mail = Mail()


def create_app(config_type, package_name, package_path):
    app = Flask(__name__, instance_relative_config=True)

    CORS(app)

    app_settings = config[config_type]
    app.config.from_object(app_settings)

    # initializations
    db.init_app(app)
    bcrypt.init_app(app)
    mail.init_app(app)

    # access config variables as: app.config['DEBUG']
    # register all api blueprints found in the application
    register_blueprints(app, package_name, package_path)

    return app
