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

        errors = RequestListSchema().validate(req)
        if errors:
            return res('Errors in request', 'alert', errors=errors), 400

        try:
            user = User.objects(id=req['employee'])[0]
        except:
            return res("User doesn't exist", 'error'), 400
        if user['role'] != 'employee':
            return res("User not an employee", 'error'), 400

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
        except:
            return res("Request doesn't exist", 'error'), 400
        return res('Retrieved Successfully', 'success', requests=convert_query(requests))


class RequestAPI(Resource):
    # |- /request/<id>
    # |- PUT: Modify request
    # |- DELETE: Delete request
    # |- GET: Return request

    def put(self, id):
        req = parse(request)
        errors = RequestSchema().validate(req)
        if errors:
            return res('Errors in request', 'alert', errors=errors), 400

        try:
            returned_request = Request.objects(id=id)[0]
        except:
            return res("Request doesn't exist", 'error'), 400

        for i in req:
            returned_request[i] = req[i]

        return res('Request modified', 'success')

    def delete(self, id):
        try:
            returned_request = Request.objects(id=id)[0]
        except:
            return res("Request doesn't exist", 'error'), 400

        returned_request.delete()

        return res('Deleted request', 'success')

    def get(self, id):
        try:
            user = User.objects(id=id)[0]
            returned_requests = Request.objects(employee=id)
            return res('Users request returned successfully', 'success', returned_reuqests=convert_query(returned_requests))
        except:
            pass

        try:
            returned_request = Request.objects(id=id)[0]
        except:
            return res("Request doesn't exist", 'error'), 400

        return res('Request returned successfully', 'success', returned_request=convert_query(returned_request))


class RequestParameterListAPI(Resource):
    # |- /request/<id>/parameter
    # |- POST: Add a new Request Parameter
    # |- GET: Return all Request Parameters

    def post(self, id):
        req = parse(request)
        errors = RequestParameterListSchema().validate(req)
        if errors:
            return res('Errors in request', 'alert', errors=errors), 400
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

        return res('Request Parameter added', 'success', request=convert_query(returned_request))

    def get(self, id):
        # Check request is valid
        try:
            returned_request = Request.objects(id=id)[0]
        except:
            return res("Request doesn't exist", 'error'), 400

        return res('Return Parameters Returned', 'success', request_parameters=convert_query(returned_request)['request_parameter_list'])


class RequestParameterAPI(Resource):
    # |- /request/<id>/request/<pid>
    # |- PUT: Modify request parameter
    # |- DELETE: Delete request parameter
    # |- GET: Return request parameter

    def put(self, id, pid):
        req = parse(request)
        errors = RequestParameterSchema().validate(req)
        if errors:
            return res('Errors in request', 'alert', errors=errors), 400

        try:
            returned_request = Request.objects(id=id)[0]
        except:
            return res("Request doesn't exist", 'error'), 400

        found = False
        for parameter in returned_request['request_parameter_list']:
            if str(parameter['_id']) == pid:
                found = True
                for j in req:
                    parameter[j] = req[j]

            # FIXME: There *must* be a better way todo this, using __ notation or something
        returned_request.save()

        if not found:
            return res("Request Parameter not present within Request 😔", 'error'), 400

        return res("Request Parameter Updated 🎉", "success", request_parameter=convert_query(returned_request))

    def delete(self, id, pid):
        try:
            returned_request = Request.objects(id=id)[0]
        except:
            return res("Request doesn't exist", 'error'), 400

        found = False
        for parameter in returned_request['request_parameter_list']:
            if str(parameter['_id']) == pid:
                found = True
                returned_request['request_parameter_list'].remove(parameter)

            # FIXME: There *must* be a better way todo this, using __ notation or something
        returned_request.save()

        if not found:
            return res("Request Parameter doesn't exist", 'error'), 400

        return res("Request Parameter Updated 🎉", "success", request_parameter=convert_query(returned_request))

    def get(self, id, pid):
        try:
            returned_request = Request.objects(id=id)[0]
        except:
            return res("Request doesn't exist", 'error'), 400

        for parameter in returned_request['request_parameter_list']:
            if str(parameter['_id']) == pid:
                return res("Request Parameter Updated 🎉", "success", request_parameter=convert_query(parameter))

        return res("Request Parameter doesn't exist", 'error'), 400
