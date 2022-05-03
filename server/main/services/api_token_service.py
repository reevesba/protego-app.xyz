# coding=utf-8

''' ApiService class - This class holds the methods
    related to Api manipulations.
'''

from server.main.models.api_token import ApiToken
from server.main.services import SQLAlchemyService


class ApiTokenService(SQLAlchemyService):
    __model__ = ApiToken

    def __init__(self):
        # creating a parent class ref to access parent class methods.
        self.parentClassRef = super(ApiTokenService, self)
