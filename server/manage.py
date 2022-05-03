"""
Test Suite for Flask.
To run:
python test_suite test
python test_suite cov
"""

import os
import unittest
from datetime import datetime
from coverage import coverage
from flask_script import Manager

from server.main import db
from server.main.api import create_app_blueprint
from server.main.models.user import User
from server.main.models.role import Role

COV = coverage(
    branch=True,
    include='main/*',
    omit=[
        'tests/*',
        'wsgi.py',
        'settings.py',
        '__init__.py',
        'main/*/__init__.py'
        'main/static/*'
        'main/templates/*'
        'main/import_policy/*'
        'main/models/*'
    ]
)

COV.start()

# create flask application instance
app = create_app_blueprint('development')
manager = Manager(app)


@manager.command
def test():
    """Runs the unit tests without test coverage."""
    test_suite = unittest.TestLoader().discover('tests', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(test_suite)
    if result.wasSuccessful():
        return 0
    return 1


@manager.command
def cov():
    """Runs the unit tests with coverage."""
    tests = unittest.TestLoader().discover('tests', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        COV.stop()
        COV.save()
        print('Coverage Summary:')
        COV.report()
        COV.html_report(directory='tests/coverage')
        COV.erase()
        return 0
    return 1


@manager.command
def recreate_db():
    # db.drop_all()
    db.create_all()
    db.session.commit()


@manager.command
def seed_db():
    print('Seeding database...')
    photo_url_a = 'static/profile_photos/default-yoda-'
    photo_url_b = '3.14159265358979323846264338327950288419716939937510.jpg'
    if not User.query.filter(User.username == 'admin').first():
        user = User(
            username='admin',
            photo_url=photo_url_a + photo_url_b,
            first_name='Bradley',
            last_name='Reeves',
            email=os.getenv('PROTEGO_EMAIL'),
            email_confirmed_at=datetime.utcnow(),
            password=os.getenv('PROTEGO_PASSWORD'),
            created_by='seed script'
        )
        role = Role(
            name='admin',
            description='System Administrator',
            created_by='seed script'
        )
        user.roles.append(role)
        db.session.add(user)
        db.session.commit()

    if not Role.query.filter(Role.name == 'member').first():
        member_role = Role(
            name='member',
            description='Site User',
            created_by='seed script'
        )
        db.session.add(member_role)
        db.session.commit()


if __name__ == '__main__':
    manager.run()
