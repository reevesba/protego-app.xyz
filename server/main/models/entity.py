# coding=utf-8

# superclass to all entities
# used to define some common properties

from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime, inspect, Boolean


class Entity():
    id = Column(Integer, primary_key=True)
    active = Column(Boolean(), default=True, nullable=False)
    created_at = Column(DateTime)
    created_by = Column(String)
    updated_at = Column(DateTime)
    updated_by = Column(String)

    def __init__(self, created_by):
        self.created_at = datetime.utcnow()
        self.created_by = created_by
        self.updated_at = datetime.utcnow()
        self.updated_by = created_by

    def as_dict(self):
        return {c.key: getattr(self, c.key)
                for c in inspect(self).mapper.column_attrs}
