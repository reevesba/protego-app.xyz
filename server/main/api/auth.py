from flask import (
    Blueprint, request, make_response, jsonify, render_template, current_app
)
from server.main import db, bcrypt
from server.main.models.user import User, UserSchema
from server.main.models.role import Role
from server.main.models.user_role import UserRoles
from server.main.models.blacklist_token import BlacklistToken
from server.main.services.user_service import UserService
from server.main.services.user_roles_service import UserRolesService
from server.main.services.blacklist_service import BlacklistService
from server.main.utils.jwt_utils import (
    encode_auth_token, encode_refresh_token, decode_auth_token
)
from server.main.utils.email_confirmation.email_conf_utils import (
    generate_confirmation_token, confirm_token
)
from server.main.utils.email_confirmation.email import send_email
from server.main.utils.decorators import requires_auth
from datetime import datetime
import json
import requests

route = Blueprint('auth', __name__)

user_service = UserService()
user_roles_service = UserRolesService()
blacklist_service = BlacklistService()


@route.route("/api/auth/register", methods=['POST'])
def create_user():
    post_data = UserSchema(only=(
        'email',
        'password',
        'first_name',
        'last_name',
        'username',
        'created_by'
    )).load(request.get_json())
    photo_url_a = 'static/profile_photos/default-yoda-'
    photo_url_b = '3.14159265358979323846264338327950288419716939937510.jpg'
    photo_url = photo_url_a + photo_url_b

    try:
        # save new user to db
        user = User(
            post_data['email'],
            None,
            post_data['password'],
            post_data['first_name'],
            post_data['last_name'],
            post_data['username'],
            photo_url,
            post_data['created_by']
        )
        user_service.save(user)

        # assign member role
        role = Role.query.filter_by(name='member').first()
        user_role = UserRoles(user.id, role.id, user.username)
        user_roles_service.save(user_role)

        # generate tokens
        auth_token = encode_auth_token(user.id, user.username, role.name)
        refresh_token = encode_refresh_token(user.id)
        is_confirmed = False

        # send confirmation email
        generate_confirm_email(user)

        return success_response(
            'user created',
            auth_token,
            refresh_token,
            is_confirmed,
            201
        )

    except Exception as e:
        # rollback database changes
        if user_role:
            user_roles_service.delete(user_role)
        if user:
            user_service.delete(user)

        return error_response(e, 500)


@route.route("/api/auth/login", methods=['POST'])
def login():
    post_data = UserSchema(only=('email', 'password')).load(request.get_json())

    try:
        # fetch user data
        user = User.query.filter_by(email=post_data['email']).first()

        if user and bcrypt.check_password_hash(
            user.password, post_data['password']
        ):
            # generate tokens
            auth_token = encode_auth_token(
                user.id,
                user.username,
                user.roles.first().name
            )
            refresh_token = encode_refresh_token(user.id)

            if auth_token and refresh_token:
                is_confirmed = True if user.email_confirmed_at else False
                return success_response(
                    'login successful',
                    auth_token,
                    refresh_token,
                    is_confirmed
                )
        else:
            return error_response('user not found')
    except Exception as e:
        return error_response(e, 500)


@route.route("/api/auth/logout", methods=['POST'])
def logout():
    # get auth token
    auth_header = request.headers.get('Authorization')

    if auth_header:
        auth_token = auth_header.split(" ")[1]
    else:
        auth_token = ''

    if auth_token:
        decoded_token = decode_auth_token(auth_token)
        if not isinstance(decoded_token, str):
            # mark the token as blacklisted
            blacklist_token = BlacklistToken(token=auth_token)

            try:
                blacklist_service.save(blacklist_token)
                return success_response('logout successful')
            except Exception as e:
                return error_response(e, 500)
        else:
            return error_response(decoded_token, 500)
    else:
        return error_response('no token provided', 403)


@route.route("/api/auth/refresh-token", methods=['POST'])
def refresh_token():
    user_id = request.get_json().get('user_id')
    refresh_token = request.get_json().get('refresh_token')

    if not refresh_token or not user_id:
        return error_response('refresh token not found', 200)

    user = User.query.filter_by(id=user_id).first()
    auth_token = encode_auth_token(
        user.id,
        user.username,
        user.roles.first().name
    )
    refresh_token = encode_refresh_token(user.id)

    is_confirmed = True if user.email_confirmed_at else False
    return success_response(
        'token refreshed',
        auth_token,
        refresh_token,
        is_confirmed
    )


@route.route("/api/auth/confirm-email/<token>", methods=['POST'])
@requires_auth()
def confirm_email(token):
    try:
        email = confirm_token(token)
    except RuntimeError:
        return error_response('confirmation link is invalid or has expired')

    user = User.query.filter_by(email=email).first_or_404()
    if user.email_confirmed_at:
        return error_response('account already confirmed, please login', 409)
    else:
        user.email_confirmed_at = datetime.utcnow()
        user_service.save(user)
        return error_response('success', 200)


@route.route('/api/auth/resend-email', methods=['POST'])
@requires_auth()
def resend_email():
    try:
        username = request.get_json().get('username')
        user = User.query.filter_by(username=username).first()
        generate_confirm_email(user)
        return success_response('email resent')
    except RuntimeError:
        return error_response('unable to resend email')


@route.route('/api/auth/reset-password', methods=['POST'])
def send_password_reset():
    try:
        email = request.get_json().get('email')
        user = User.query.filter_by(email=email).first()
        generate_password_reset_email(user)
        return success_response('reset password email sent')
    except RuntimeError:
        return error_response('unable to send password reset email')


@route.route('/api/auth/update-password', methods=['PUT'])
def update_password():
    token = request.get_json().get('token')
    password = request.get_json().get('password')
    email = confirm_token(token)
    if email is False:
        return error_response('reset link is invalid or has expired')

    user = User.query.filter_by(email=email).first()
    user.password = bcrypt.generate_password_hash(password).decode('utf-8')

    generate_password_reset_notification_email(user)
    return success_response('password updated successfully')


@route.route('/api/auth/validate-recaptcha', methods=['POST'])
def validate_recaptcha():
    secret = current_app.config.get('RECAPTCHA_SECRET_KEY')
    response = request.get_json().get('response')
    payload = {'response': response, 'secret': secret}
    response = requests.post(
        'https://www.google.com/recaptcha/api/siteverify',
        payload
    )
    return {'success': json.loads(response.text)['success']}, 201


@route.route("/api/auth/username-available/<username>", methods=['GET'])
def username_available(username):
    user = db.session.query(User).filter_by(username=username).first()
    if user:
        return {'available': 'false'}, 200
    else:
        return {'available': 'true'}, 200


@route.route("/api/auth/email-available/<email>", methods=['GET'])
def email_available(email):
    user = db.session.query(User).filter_by(email=email).first()
    if user:
        return {'available': 'false'}, 200
    else:
        return {'available': 'true'}, 200


def generate_confirm_email(user):
    email_token = generate_confirmation_token(user.email)
    confirm_url = 'https://protego-app.xyz/signup/confirm-email/' + email_token

    subject = "Please Confirm Your Account"
    html = render_template('email_confirmation.html', confirm_url=confirm_url)
    send_email(user.email, subject, html)


def generate_password_reset_email(user):
    email_token = generate_confirmation_token(user.email)
    confirm_url = 'https://protego-app.xyz/login/reset-password/' + email_token

    subject = "Please Reset Your Password"
    html = render_template(
        'email_password_reset.html',
        confirm_url=confirm_url
    )
    send_email(user.email, subject, html)


def generate_password_reset_notification_email(user):
    subject = "Your Password was Reset"
    html = render_template(
        'email_password_reset_notify.html',
        username=user.username
    )

    send_email(user.email, subject, html)


def error_response(message='failure', code=404):
    response = {
        'status': 'fail',
        'message': message
    }
    return make_response(jsonify(response)), code


def success_response(message='success', auth_token=None, refresh_token=None,
                     is_confirmed=False, code=200):
    response = {
        'status': 'success',
        'message': message,
        'auth_token': auth_token,
        'refresh_token': refresh_token,
        'is_confirmed': is_confirmed
    }
    return make_response(jsonify(response)), code
