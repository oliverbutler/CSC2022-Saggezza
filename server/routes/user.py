from flask import request
from flask_restful import Resource
from functions import *
from mongoengine import *

from model import User

# Connect to mongodb
connect('saggezza_db', host='localhost', port=27017)


class UserListAPI(Resource):
    # |- /user
    # |- POST: Create a new user
    # \- GET: Return all users

    def post(self):
        req = parse(request)
        user = User(
            first_name=req['first_name'],
            last_name=req['last_name'],
            email=req['email'],
            role=req['role'],
        )
        user.save()
        return res('User created', 'success', user=convert_query(user))

    def get(self):
        # TODO: To be implemented
        return res('All users returned', 'success')


class UserAPI(Resource):
    # |- /user/<id>
    # |- PUT: Edit user
    # |- DELETE: Delete user
    # \- GET: Return user

    def put(self, id):
        # TODO: To be implemented
        return res('User modified', 'success')

    def delete(self, id):
        # TODO: To be implemented
        return res('User deleted', 'success')

    def get(self, id):
        # TODO: To be implemented
        return res('User returned', 'success')


class UserProfileAPI(Resource):
    # |- /user/<id>/profile
    # |- POST: Upload new profile picture
    # \- DELETE: Delete profile picture

    def post(self, id):
        # TODO: To be implemented
        return res('Profile image added successfully', 'success')

    def delete(self, id):
        # TODO: To be implemented
        return res('Profile image deleted', 'success')
