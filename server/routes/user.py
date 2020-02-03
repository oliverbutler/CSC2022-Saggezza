from flask import request
from flask_restful import Resource
from functions import *
from mongoengine import *

from model import User

# Connect to mongodb
connect('saggezza_db', host='localhost', port=27017)


class UserAPI(Resource):
    def post(self):
        req = parse(request)
        user = User(
            first_name=req['first_name'],
            last_name=req['last_name'],
            email=req['email'],
            role=req['role'],
        )
        user.save()
        return "User added"

    def get(self):
        return "GET Done!"
