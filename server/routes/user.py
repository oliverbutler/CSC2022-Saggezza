from flask import request
from flask_restful import Resource
from functions import *
from mongoengine import *
from PIL import Image

from model import User

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
        # TODO: To be implemented
        return res('User modified', 'success')

    def delete(self, id):
        try:
            User.objects(id=id).delete()
            return res('User deleted 💀', 'success')
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
        try:
            user = User.objects(id=id)[0]
            if 'file' in request.files:
                file = request.files["file"]
                size = 128, 128
                im = Image.open(file)
                im.thumbnail(size)
                im.save(UPLOAD_FOLDER + id +  ".jpg")
                user['profile_picture'] = "/profile/" + id + ".jpg"
                return res('Profile image added successfully', 'success')
            else:
                return res("No file in the request called file", "error"), 400
        except:
            return res("User doesn't exist", 'error'), 400
        

    def delete(self, id):
        # TODO: To be implemented
        return res('Profile image deleted', 'success')
