# coding=utf-8

''' RoleService class - This class holds the methods
    related to Role manipulations.
'''

from server.main.models.role import Role
from server.main.services import SQLAlchemyService


class RoleService(SQLAlchemyService):
    __model__ = Role

    def __init__(self):
        # creating a parent class ref to access parent class methods.
        self.parentClassRef = super(RoleService, self)
