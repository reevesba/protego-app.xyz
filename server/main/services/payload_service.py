# coding=utf-8

''' PayloadService class - This class holds the methods
    related to Payload manipulations.
'''

from server.main.models.payload import Payload
from server.main.services import SQLAlchemyService


class PayloadService(SQLAlchemyService):
    __model__ = Payload

    def __init__(self):
        # creating a parent class ref to access parent class methods.
        self.parentClassRef = super(PayloadService, self)
