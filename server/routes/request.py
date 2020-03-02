from flask import request
from flask_restful import Resource
from functions import *
from mongoengine import *
from schema.request import *
from PIL import Image
from model import *
import datetime
import os

from routes.auth import auth

# Connect to mongodb
connect("saggezza_db", host="localhost", port=27017)


class RequestListAPI(Resource):
    # |- /request
    # |- POST: Add a new request
    # |- GET: Return all of a users requests
    @auth.login_required
    def post(self):
        caller = get_caller(request)
        if caller["role"] not in ["admin", "employee"]:
            return res("⛔️ Must be an employee to submit a request", "error"), 401

        req = parse(request)

        errors = RequestListSchema().validate(req)
        if errors:
            return res("Errors in request", "alert", errors=errors), 400

        try:
            user = User.objects(id=req["employee"])[0]
        except:
            return res("User doesn't exist", "error"), 400
        if user["role"] != "employee":
            return res("Cant assign a request to a " + user["role"], "error"), 400

        new_request = Request(name=req["name"], employee=user)

        new_request.save()

        user["request_list"].append(new_request)
        user.save()

        return res("Added a new request", "success", request=convert_query(new_request))

    @auth.login_required
    def get(self):
        caller = get_caller(request)
        if caller["role"] == "employee":
            requests = caller["request_list"]
            return res(
                "Your requests returned",
                "success",
                requests=convert_query(requests, list=True),
            )
        elif caller["role"] == "manager":
            all_requests = []
            employees = caller["employees"]
            for employee in employees:
                all_requests.append(employee["request_list"])
            return res(
                "Your employees requests returned",
                "success",
                requests=convert_query(all_requests, list=True),
            )

        requests = Request.objects().all()
        return res(
            "Retrieved all requests",
            "success",
            requests=convert_query(requests, list=True),
        )


class RequestAPI(Resource):
    # |- /request/<id>
    # |- PUT: Modify request
    # |- DELETE: Delete request
    # |- GET: Return request
    @auth.login_required
    def put(self, id):
        caller = get_caller(request)

        req = parse(request)
        errors = RequestSchema().validate(req)
        if errors:
            return res("Errors in request", "alert", errors=errors), 400

        try:
            returned_request = Request.objects(id=id)[0]
        except:
            return res("Request doesn't exist", "error"), 400

        if caller["role"] == "manager":
            returned_request["status"] = req["status"]
        elif caller["role"] == "admin":
            for i in req:
                returned_request[i] = req[i]
        else:
            for i in req:
                if i == "status":
                    return res("Cannot change a request status", "error"), 400
                else:
                    returned_request[i] = req[i]

        return res("Request modified", "success")

    @auth.login_required
    def delete(self, id):
        caller = get_bearer(request)
        if caller["role"] != "employee":
            return res("⛔️ Must be an employee to delete a request", "error"), 401

        try:
            returned_request = Request.objects(id=id)[0]
        except:
            return res("Request doesn't exist", "error"), 400

        returned_request.delete()

        return res("Deleted request", "success")

    @auth.login_required
    def get(self, id):
        try:
            user = User.objects(id=id)[0]
            returned_requests = Request.objects(employee=id)
            return res(
                "Users request returned successfully",
                "success",
                request=convert_query(returned_requests, list=True),
            )
        except:
            pass

        try:
            returned_request = Request.objects(id=id)[0]
        except:
            return res("Request doesn't exist", "error"), 400

        return res(
            "Request returned successfully",
            "success",
            request=convert_query(returned_request),
        )


class RequestParameterListAPI(Resource):
    # |- /request/<id>/parameter
    # |- POST: Add a new Request Parameter
    # |- GET: Return all Request Parameters
    @auth.login_required
    def post(self, id):
        caller = get_caller(request)
        if caller["role"] == "admin":
            pass
        elif caller["role"] != "employee":
            return (
                res(
                    "⛔️ Must be an employee or admin to change a request parameter",
                    "error",
                ),
                401,
            )

        req = parse(request)
        errors = RequestParameterListSchema().validate(req)
        if errors:
            return res("Errors in request", "alert", errors=errors), 400

        # Check user is valid
        try:
            returned_request = Request.objects(id=id)[0]
        except:
            return res("Request doesn't exist", "error"), 400

        # Check category is a valid category
        try:
            category = Category.objects(id=req["category"])[0]
        except:
            return res("Category doesn't exist", "error"), 400

        request_parameter = RequestParameter(
            category=category,
            name=req["name"],
            amount=req["amount"],
            date_expense=req["date_expense"],
            billable_client=req["billable_client"],
            payment_method=req["payment_method"],
        )

        try:
            request_parameter["description"] = req["description"]
        except:
            pass

        returned_request["request_parameter_list"].append(request_parameter)
        returned_request.save()

        return res(
            "Request Parameter added",
            "success",
            parameter=convert_query(request_parameter),
            request=convert_query(returned_request),
        )

    @auth.login_required
    def get(self, id):
        try:
            returned_request = Request.objects(id=id)[0]
        except:
            return res("Request doesn't exist", "error"), 400

        return res(
            "Return Parameters Returned",
            "success",
            request_parameters=convert_query(returned_request)[
                "request_parameter_list"
            ],
        )


class RequestParameterAPI(Resource):
    # |- /request/<id>/request/<pid>
    # |- PUT: Modify request parameter
    # |- DELETE: Delete request parameter
    # |- GET: Return request parameter
    @auth.login_required
    def put(self, id, pid):
        caller = get_caller(request)
        if caller["role"] != "employee":
            return (
                res("⛔️ Must be an employee to change a request parameter", "error"),
                401,
            )

        req = parse(request)
        errors = RequestParameterSchema().validate(req)
        if errors:
            return res("Errors in request", "alert", errors=errors), 400

        try:
            returned_request = Request.objects(id=id)[0]
        except:
            return res("Request doesn't exist", "error"), 400

        found = False
        for parameter in returned_request["request_parameter_list"]:
            if str(parameter["_id"]) == pid:
                found = True
                for j in req:
                    parameter[j] = req[j]

            # FIXME: There *must* be a better way todo this, using __ notation or something
        returned_request.save()

        if not found:
            return res("Request Parameter not present within Request 😔", "error"), 400
    
        return res(
            "Request Parameter Updated 🎉",
            "success",
            request_parameter=convert_query(returned_request),
        )

    @auth.login_required
    def delete(self, id, pid):
        caller = get_caller(request)
        if caller["role"] != "employee":
            return (
                res("⛔️ Must be an employee to delete a request parameter", "error"),
                401,
            )

        try:
            returned_request = Request.objects(id=id)[0]
        except:
            return res("Request doesn't exist", "error"), 400

        found = False
        for parameter in returned_request["request_parameter_list"]:
            if str(parameter["_id"]) == pid:
                found = True
                returned_request["request_parameter_list"].remove(parameter)

            # FIXME: There *must* be a better way todo this, using __ notation or something
        returned_request.save()

        if not found:
            return res("Request Parameter doesn't exist", "error"), 400

        return res(
            "Request Parameter Updated 🎉",
            "success",
            request_parameter=convert_query(returned_request),
        )

    @auth.login_required
    def get(self, id, pid):
        try:
            returned_request = Request.objects(id=id)[0]
        except:
            return res("Request doesn't exist", "error"), 400

        for parameter in returned_request["request_parameter_list"]:
            if str(parameter["_id"]) == pid:
                return res(
                    "Request Parameter Returned 🎉",
                    "success",
                    request_parameter=convert_query(parameter),
                )

        return res("Request Parameter doesn't exist", "error"), 400
