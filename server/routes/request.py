from flask import request
from flask_restful import Resource
from functions import *
from mongoengine import *
from schema.request import *
from PIL import Image
from model import *
import datetime
import os


# Connect to mongodb
connect('saggezza_db', host='localhost', port=27017)


class RequestListAPI(Resource):
    # |- /request
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
            employee=user
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
    # |- /request/<id>
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


class RequestParameterListAPI(Resource):
    # |- /request/<id>/parameter
    # |- POST: Add a new Request Parameter
    # |- GET: Return all Request Parameters

    def post(self, id):
        req = parse(request)

        # Check user is valid
        try:
            returned_request = Request.objects(id=id)[0]
        except:
            return res("Request doesn't exist", 'error'), 400

        # Check category is a valid category
        try:
            category = Category.objects(id=req['category'])[0]
        except:
            return res("Category doesn't exist", 'error'), 400

        request_parameter = RequestParameter(
            category=category,
            name=req['name'],
            amount=req['amount'],
            date_expense=req['date_expense'],
            billable_client=req['billable_client'],
            payment_method=req['payment_method']
        )

        # TODO: File support

        # Optional field
        if(req['description']):
            request_parameter['description'] = req['description']

        returned_request['request_parameter_list'].append(request_parameter)
        returned_request.save()

        return res('Request Parameter added', 'success')

    def get(self, id):
        # Check request is valid
        try:
            returned_request = Request.objects(id=id)[0]
        except:
            return res("Request doesn't exist", 'error'), 400

        return res('Return Parameters Returned', 'success', request_parameters=returned_request['request_parameter_list'])


class RequestParameterAPI(Resource):
    pass
