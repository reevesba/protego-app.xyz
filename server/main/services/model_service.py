# coding=utf-8

''' ModelService class - This class holds the methods
    related to Model manipulations.
'''

from server.main.models.model import Model
from server.main.services import SQLAlchemyService


class ModelService(SQLAlchemyService):
    __model__ = Model

    def __init__(self):
        # creating a parent class ref to access parent class methods.
        self.parentClassRef = super(ModelService, self)
