from flask import request
from flask_restful import Resource
from functions import *
from mongoengine import *

from model import Category

# Connect to mongodb
connect('saggezza_db', host='localhost', port=27017)


class CategoryListAPI(Resource):
    # |- /category
    # |- POST: Create a new category
    # \- GET: Return all categories
    def post(self):
        return res('Category created successfully', 'success')

    def get(self):
        return res('All categories returned', 'success')


class CategoryAPI(Resource):
    # |- /category/<id>
    # |- PUT: Update new category
    # |- GET: Return category
    # \- DELETE: Delete category

    def put(self, id):
        return res('Modify category', 'success')

    def get(self, id):
        return res('Return category', 'success')

    def delete(self, id):
        return res('Deleted category', 'success')
