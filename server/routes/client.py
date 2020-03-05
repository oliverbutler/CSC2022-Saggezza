from flask import request
from flask_restful import Resource
from functions import *
from mongoengine import *
from schema.category import *
from schema.client import *

from model import Client

from routes.auth import auth

# Connect to mongodb
connect("saggezza_db", host="localhost", port=27017)


class ClientListAPI(Resource):
    # |- /client
    # |- POST: Add a new client
    # |- GET: Return list of clients

    @auth.login_required
    def post(self):
        caller = get_caller(request)
        if caller["role"] != "admin":
            return res("⛔️ Must be an admin to add a new client", "error"), 400

        req = parse(request)
        errors = ClientListSchema().validate(req)
        if errors:
            return res("Errors in request", "alert", errors=errors), 400

        client = Client(name=req["name"])

        if "email" in req:
            client["email"] = req["email"].lower()

        client.save()

        return res("Added a new client", "success", client=convert_query(client))

    @auth.login_required
    def get(self):
        clients = Client.objects().all()
        return res(
            "Returned list of clients",
            "success",
            clients=convert_query(clients, list=True),
        )


class ClientAPI(Resource):
    # |- /client/<id>
    # |- PUT: Modify client
    # |- DELETE: Delete client
    # |- GET: Return client

    @auth.login_required
    def put(self, id):
        caller = get_caller(request)
        if caller["role"] != "admin":
            return res("⛔️ Must be an admin to modify a client", "error"), 400

        req = parse(request)
        errors = ClientSchema().validate(req)
        if errors:
            return res("Errors in request", "alert", errors=errors), 400
        try:
            client = Client.objects(id=id)[0]
        except:
            return res("Client doesn't exist", "error"), 400

        for i in req:
            client[i] = req[i]

        client.save()

        return res("Modified client", "success", client=convert_query(client))

    @auth.login_required
    def delete(self, id):
        caller = get_bearer(request)
        if caller["role"] != "admin":
            return res("⛔️ Must be an admin to delete a client", "error"), 400
        try:
            client = Client.objects(id=id)
        except:
            return res("Client doesn't exist", "error"), 400

        client.delete()

        return res("Deleted client", "success")

    @auth.login_required
    def get(self, id):

        try:
            client = Client.objects(id=id)[0]
            return res("Returned client", "success", client=convert_query(client))
        except:
            return res("Client doesn't exist", "error"), 400
