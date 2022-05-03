# coding=utf-8

''' GroupMembersService class - This class holds the methods
    related to GroupMembers manipulations.
'''

from server.main.models.group_member import GroupMember
from server.main.services import SQLAlchemyService


class GroupMemberService(SQLAlchemyService):
    __model__ = GroupMember

    def __init__(self):
        # creating a parent class ref to access parent class methods.
        self.parentClassRef = super(GroupMemberService, self)
