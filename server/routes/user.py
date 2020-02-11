from flask import request
from flask_restful import Resource
from functions import *
from mongoengine import *
from schema.user import *

from model import User, Request
import datetime


# Connect to mongodb
connect('saggezza_db', host='localhost', port=27017)

UPLOAD_FOLDER = './static/profile/'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])


class UserListAPI(Resource):
    # |- /user
    # |- POST: Create a new user
    # \- GET: Return all users

    def post(self):
        req = parse(request)
        errors = UserListSchema().validate(req)
        if errors:
            return res('Errors in request', 'alert', errors=errors), 400
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
        req = parse(request)
        errors = UserSchema().validate(req)
        if errors:
            return res('Errors in request', 'alert', errors=errors), 400
        try:
            user = User.objects(id=id)[0]
        except:
            return res("User doesn't exist", 'error'), 400

        for i in req:
            user[i] = req[i]

        return res('User modified', 'success', user=convert_query(user))

    def delete(self, id):
        try:
            user = User.objects(id=id)
        except:
            return res("User doesn't exist", 'error'), 400

        user.delete()
        return res('User deleted 💀', 'success', user=convert_query(user))

    def get(self, id):
        try:
            user = User.objects(id=id)[0]
            return res('Retrieved Successfully', 'success', user=convert_query(user))
        except:
            return res("User doesn't exist", 'error'), 400


class UserProfileAPI(Resource):
    # |- /user/<id>/profile JENNY
    # |- POST: Upload new profile picture
    # \- DELETE: Delete profile picture

    def post(self, id):
        try:
            user = User.objects(id=id)[0]
            if 'file' in request.files:
                file = request.files["file"]
                size = 128, 128
                im = Image.open(file)
                im.thumbnail(size)
                im.save(UPLOAD_FOLDER + id + ".jpg")
                user['profile_picture'] = "/profile/" + id + ".jpg"
                return res('Profile image added successfully', 'success')
            else:
                return res("No file in the request called file", "error"), 400
        except:
            return res("User doesn't exist", 'error'), 400

    def delete(self, id):
        # TODO: To be implemented
        return res('Profile image deleted', 'success')


class UserRequestListAPI(Resource):
    # |- /user/<id>/request NOTE: User must be an employee
    # |- POST: Add a new request
    # |- GET: Return all of a users requests

    def post(self, id):
        req = parse(request)
        try:
            user = User.objects(id=id)[0]
        except:
            return res("User doesn't exist", 'error'), 400

        new_request = Request(
            name="test",
            date_submit=datetime.datetime.now(),
            status="pending"
        )

        user['request_list'].append(new_request)
        user.save()

        return res('Add a new request', 'success')


class UserRequestAPI(Resource):
    # |- /user/<id>/request/<rid> NOTE: User must be an employee
    # |- PUT: Modify request
    # |- DELETE: Delete request
    # |- GET: Return request

    def put(self, id, rid):
        return res('Request modified', 'success')

    def delete(self, id, rid):
        return res('Deleted request', 'success')

    def get(self, id, rid):
        return res('Returned request', 'success')


class UserEmployeeListAPI(Resource):
    # |- /user/<id>/employee NOTE: User must be a Manager
    # |- POST: Add new employee
    # |- GET: Return all employees

    def put(self, id):
        return res('Employee Added', 'success')

    def get(self, id):
        return res('All employees returned', 'success')


class UserEmployeeAPI(Resource):
    # |- /user/<id>/employee/<eid> NOTE: User must be a Manager
    # |- DELETE: Delete employee

    def delete(self, id, eid):
        return res('Deleted employee', 'success')
