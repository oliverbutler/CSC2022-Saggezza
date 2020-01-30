from flask import request
from flask_restful import Resource
from functions import *
from model import User, Request, Client, Category, Project

# Connect to mongodb
connect('saggezza_db', host='localhost', port=27017)


class User(Resource):
    def post(self):
        req = request
        user = User(
            first_name=request['first_name'],
            last_name=request['last_name'],
            email=request['email'],
            role=request['role'],
        )
        user.save()
        return "User added"

    def get(self):
        return "Hello fucko!"
