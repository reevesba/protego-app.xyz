''' Send Account Confirmation Email
'''

from flask_mail import Message
from flask import current_app
from server.main import mail


def send_email(to, subject, template):
    msg = Message(
        subject,
        recipients=[to],
        html=template,
        sender=current_app.config.get('MAIL_USERNAME')
    )
    mail.send(msg)
