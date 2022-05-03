# coding=utf-8

''' BlacklistService class - This class holds the methods
    related to token blacklisting.
'''

from server.main.models.blacklist_token import BlacklistToken
from server.main.services import SQLAlchemyService


class BlacklistService(SQLAlchemyService):
    __model__ = BlacklistToken

    def __init__(self):
        # creating a parent class ref to access parent class methods.
        self.parentClassRef = super(BlacklistService, self)
