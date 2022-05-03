# coding=utf-8

''' UserRolesService class - This class holds the methods
    related to User manipulations.
'''

from server.main.models.user_role import UserRoles
from server.main.services import SQLAlchemyService


class UserRolesService(SQLAlchemyService):
    __model__ = UserRoles

    def __init__(self):
        # creating a parent class ref to access parent class methods.
        self.parentClassRef = super(UserRolesService, self)
