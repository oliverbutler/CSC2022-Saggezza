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
        users = User.objects().all()
        return res('All users returned', 'success', users=convert_query(users))


class UserAPI(Resource):
    # |- /user/<id>
    # |- PUT: Edit user
    # |- DELETE: Delete user
    # \- GET: Return user

    def put(self, id):

        try:
            req = parse(request)
            user = User.objects(id=id)

            if "first_name" in req:
                User.objects(id=id).update(first_name=req["first_name"])
            if "last_name" in req:
                User.objects(id=id).update(last_name=req["last_name"])
            if "email" in req:
                User.objects(id=id).update(email=req["email"])
            if "role" in req and (req["role"] == "employee" or req["role"] == "manager" or req["role"] == "admin"):
                User.objects(id=id).update(role=req["role"])
            return res('User modified', 'success', user=convert_query(user))

        except:
            return res("User doesn't exist", 'error'), 400


    def delete(self, id):
        try:
            user = User.objects(id=id)
            user.delete()
            return res('User deleted 💀', 'success', user=convert_query(user))
        except:
            return res("User doesn't exist", 'error'), 400

    def get(self, id):
        try:
            user = User.objects(id=id)[0]
            return res('Retrieved Successfully', 'success', user=convert_query(user))
        except:
            return res("User doesn't exist", 'error'), 400


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
