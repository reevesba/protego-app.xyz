''' encode and decode jwts
'''

import jwt
from flask import current_app
from datetime import datetime, timedelta
from server.main.models.blacklist_token import BlacklistToken


def encode_auth_token(user_id, username, role):
    try:
        # expires in 15 minutes
        payload = {
            'exp': datetime.utcnow() + timedelta(days=0, seconds=900),
            'iat': datetime.utcnow(),
            'sub': user_id,
            'username': username,
            'role': role
        }
        return jwt.encode(
            payload,
            current_app.config.get('SECRET_KEY'),
            algorithm='HS256'
        )
    except Exception as e:
        return e


def encode_auth_token_date(group_id, expiry):
    try:
        payload = {
            'exp': expiry,
            'iat': datetime.utcnow(),
            'sub': group_id
        }
        return jwt.encode(
            payload, current_app.config.get('SECRET_KEY'), algorithm='HS256'
        )
    except Exception as e:
        return e


def decode_auth_token(auth_token):
    try:
        payload = jwt.decode(
            auth_token,
            current_app.config.get('SECRET_KEY'),
            algorithms=['HS256']
        )
        token_blacklisted = BlacklistToken.check_blacklist(auth_token)

        if token_blacklisted:
            return 'Token blacklisted. Please log in again.'
        else:
            return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'


def encode_refresh_token(user_id):
    try:
        # expires in 7 days
        payload = {
            'exp': datetime.utcnow() + timedelta(days=7, seconds=0),
            'iat': datetime.utcnow(),
            'sub': user_id
        }
        return jwt.encode(
            payload, current_app.config.get('SECRET_KEY'), algorithm='HS256'
        )
    except Exception as e:
        return e
