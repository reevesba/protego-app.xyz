# coding=utf-8

''' GroupService class - This class holds the methods
    related to Group manipulations.
'''

from server.main.models.group import Group
from server.main.services import SQLAlchemyService


class GroupService(SQLAlchemyService):
    __model__ = Group

    def __init__(self):
        # creating a parent class ref to access parent class methods.
        self.parentClassRef = super(GroupService, self)
