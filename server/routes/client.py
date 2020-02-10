from flask import request
from flask_restful import Resource
from functions import *
from mongoengine import *
from schema.category import *

from model import User


# Connect to mongodb
connect('saggezza_db', host='localhost', port=27017)


class ClientListAPI(Resource):
    # |- /client
    # |- POST: Add a new client
    # |- GET: Return list of clients

    def post(self):
        return res('Added a new client', 'success')

    def get(self):
        return res('Returned list of clients', 'success')


class ClientAPI(Resource):
    # |- /client/<id>
    # |- PUT: Modify client
    # |- DELETE: Delete client
    # |- GET: Return client

    def put(self, id):
        return res('Modified client', 'success')

    def delete(self, id):
        return res('Deleted client', 'success')

    def get(self, id):
        return res('Returned client', 'success')
