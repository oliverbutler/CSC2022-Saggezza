from flask import request
from flask_restful import Resource
from functions import *
from mongoengine import *
from schema.user import *
from PIL import Image
from model import User, Request
import datetime
import os
import uuid

# Connect to mongodb
connect('saggezza_db', host='localhost', port=27017)

UPLOAD_FOLDER = './static/profile/'
ALLOWED_EXTENSIONS = set(['jpg'])


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

        user.save()

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


class UserTokenAPI(Resource):
    # |- /user/<id>/token
    # |- POST: Verify token

    def post(self, id):

        return res("Valid", "success")


class UserProfileAPI(Resource):
    # |- /user/<id>/profile
    # |- POST: Upload new profile picture
    # \- DELETE: Delete profile picture

    def post(self, id):
        try:
            user = User.objects(id=id)[0]
        except:
            return res("User doesn't exist", 'error'), 400
        if 'file' in request.files:
            file = request.files["file"]
            size = 256, 256
            im = Image.open(file)
            im.thumbnail(size)

            if not os.path.exists(UPLOAD_FOLDER):
                os.makedirs(UPLOAD_FOLDER)

            name = uuid.uuid4().hex

            im.save(UPLOAD_FOLDER + name + ".jpg")
            user['profile_picture'] = "/profile/" + name + ".jpg"
            user.save()
            return res('Profile image added successfully', 'success')
        else:
            return res("No file in the request called file", "error"), 400

    def delete(self, id):
        try:
            user = User.objects(id=id)[0]
            if os.path.exists('./static' + user['profile_picture']):
                os.remove(os.path.join(
                    './static' + user['profile_picture']))
                user['profile_picture'] = "/default-profile.jpg"
                user.save()
                return res("Profile image deleted", 'success')
            else:
                return res("File does not exist", "error"), 400
        except:
            return res("User doesn't exist", 'error'), 400


class UserEmployeeListAPI(Resource):
    # |- /user/<id>/employee NOTE: User must be a Manager
    # |- POST: Add new employee

    def post(self, id):
        req = parse(request)
        errors = UserEmployeeListSchema().validate(req)
        if errors:
            return res('Errors in request', 'alert', errors=errors), 400
        try:
            user = User.objects(id=id)[0]
        except:
            return res("User doesn't exist", 'error'), 400
        if user["role"] == 'manager':
            try:
                employee = User.objects(id=req['employee'])[0]
                user['employees'].append(employee)
                user.save()
                return res('Employee Added', 'success', user=convert_query(user))
            except:
                return res("Employee's uuid is not valid", 'error'), 400
        else:
            return res('User is not a manager', 'error'), 400


class UserEmployeeAPI(Resource):
    # |- /user/<id>/employee/<eid> NOTE: User must be a Manager
    # |- DELETE: Delete employee

    def delete(self, id, eid):
        try:
            user = User.objects(id=id)[0]
        except:
            return res("User doesn't exist", 'error'), 400
        if user["role"] == "manager":
            try:
                user['employees'].remove(eid)
                user.save()
                return res('Employee deleted', 'success', user=convert_query(user))
            except:
                return res("Employee not found", "error"), 400
