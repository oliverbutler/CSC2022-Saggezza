from flask import request
from flask_restful import Resource
from functions import *
from mongoengine import *
# from schema.requeas import *
from PIL import Image
from model import User, Request
import datetime
import os


# Connect to mongodb
connect('saggezza_db', host='localhost', port=27017)


class RequestListAPI(Resource):
    # |- /request NOTE: User must be an employee
    # |- POST: Add a new request
    # |- GET: Return all of a users requests

    def post(self):
        req = parse(request)
        try:
            user = User.objects(id=req['employee'])[0]
            if user['role'] != 'employee':
                return res("User not an employee", 'error'), 400
        except:
            return res("User doesn't exist", 'error'), 400

        new_request = Request(
            name=req['name'],
            employee=user,
            date_submit=datetime.datetime.now(),
            status="pending"
        )
        new_request.save()

        user['request_list'].append(new_request)
        user.save()

        return res('Added a new request', 'success')

    def get(self):
        try:
            requests = Request.objects().all()
            return res('Retrieved Successfully', 'success', requests=convert_query(requests))
        except:
            return res("Request doesn't exist", 'error'), 400


class RequestAPI(Resource):
    # |- /request/<id> NOTE: User must be an employee
    # |- PUT: Modify request
    # |- DELETE: Delete request
    # |- GET: Return request

    def put(self, id):
        return res('Request modified', 'success')

    def delete(self, id):
        return res('Deleted request', 'success')

    def get(self, id):
        try:
            returned_request = Request.objects(id=id)[0]
            return res('Retrieved Successfully', 'success', returned_request=convert_query(returned_request))
        except:
            return res("Request doesn't exist", 'error'), 400
