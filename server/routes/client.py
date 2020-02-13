from flask import request
from flask_restful import Resource
from functions import *
from mongoengine import *
from schema.category import *
from schema.client import *

from model import Client


# Connect to mongodb
connect('saggezza_db', host='localhost', port=27017)


class ClientListAPI(Resource):
    # |- /client
    # |- POST: Add a new client
    # |- GET: Return list of clients

    def post(self):
        req = parse(request)
        errors = ClientListSchema().validate(req)
        if errors:
            return res('Errors in request', 'alert', errors=errors), 400

        client = Client(
            name=req['name'],
        )

        if 'email' in req:
            client['email'] = req['email'],

        client.save()

        return res('Added a new client', 'success')

    def get(self):
        clients = Client.objects().all()
        return res('Returned list of clients', 'success', clients=convert_query(clients))


class ClientAPI(Resource):
    # |- /client/<id>
    # |- PUT: Modify client
    # |- DELETE: Delete client
    # |- GET: Return client

    def put(self, id):
        req = parse(request)
        errors = ClientSchema().validate(req)
        if errors:
            return res('Errors in request', 'alert', errors=errors), 400
        try:
            client = Client.objects(id=id)[0]
        except:
            return res("Client doesn't exist", 'error'), 400

        for i in req:
            client[i] = req[i]

        return res('Modified client', 'success', client=convert_query(client))

    def delete(self, id):
        try:
            client = Client.objects(id=id)
        except:
            return res("Client doesn't exist", 'error'), 400

        client.delete()

        return res('Deleted client', 'success')

    def get(self, id):
        try:
            client = Client.objects(id=id)[0]
            return res('Returned client', 'success', client=convert_query(client))
        except:
            return res("Client doesn't exist", 'error'), 400
