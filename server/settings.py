# -*- coding: utf-8 -*-
""" file: settings.py
    notes:  Configure Settings for application
"""

import os


class Config(object):
    # flask settings
    APPNAME = 'Protego'
    SUPPORT_EMAIL = 'reevesbra@outlook.com'
    VERSION = '1.0.0'
    APPID = 'protego'
    SECRET_KEY = os.getenv('SECRET_KEY')
    TESTING = False

    # upload settings
    MAX_CONTENT_LENGTH = 1024*500  # 500 kB
    UPLOAD_EXTENSIONS = ['.jpg', '.png', '.gif']
    UPLOAD_PATH = 'server/main/static/profile_photos'

    # flask-sqlalchemy settings
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_NATIVE_UNICODE = True
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    DB_NAME = os.getenv('DB_NAME')
    DB_USER = os.getenv('POSTGRES_USER')
    DB_PASS = os.getenv('POSTGRES_PASSWORD')
    DB_SERVICE = os.getenv('DB_SERVICE')
    DB_PORT = os.getenv('DB_PORT')
    SQLALCHEMY_DATABASE_URI = 'postgresql://{0}:{1}@{2}:{3}/{4}'.format(
        DB_USER, DB_PASS, DB_SERVICE, DB_PORT, DB_NAME
    )

    # flask-mail SMTP server settings
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USE_SSL = True
    MAIL_USE_TLS = False
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')

    # flask-user settings
    USER_ENABLE_EMAIL = True            # Enable email authentication
    USER_ENABLE_USERNAME = False        # Disable username authentication
    USER_EMAIL_SENDER_NAME = APPNAME

    # bcrypt settings
    BCRYPT_LOG_ROUNDS = 4

    # recaptcha settings
    RECAPTCHA_SECRET_KEY = os.getenv('RECAPTCHA_SECRET_KEY')


class DevelopmentConfig(Config):
    # dev environment config options
    FLASK_ENV = 'development'
    DEBUG = True
    PROFILE = True


class TestingConfig(Config):
    # testing environment config options
    FLASK_ENV = 'test'
    DEBUG = False
    STAGING = False
    TESTING = True


class ProductionConfig(Config):
    # prod environment config options
    FLASK_ENV = 'production'
    DEBUG = False
    STAGING = False
    TESTING = False


config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
