from flask import request
from flask_restful import Resource
from functions import *
from mongoengine import *
from schema.category import *
from model import Category


# Connect to mongodb
connect('saggezza_db', host='localhost', port=27017)


class CategoryListAPI(Resource):
    # |- /category
    # |- POST: Create a new category
    # \- GET: Return all categories
    def post(self):
        req = parse(request)
        errors = CategorySchema().validate(req)
        if errors:
            return res('Errors in request', 'alert', errors=errors), 400
        category = Category(
            name=req['name']
        )
        category.save()
        return res('Category created successfully', 'success', category=convert_query(category))

    def get(self):
        categories = Category.objects().all()
        return res('All categories returned', 'success', categories=convert_query(categories))


class CategoryAPI(Resource):
    # |- /category/<id>
    # |- PUT: Update new category
    # |- GET: Return category
    # \- DELETE: Delete category

    def put(self, id):
        try:
            req = parse(request)
            category = Category.objects(id=id)

            for i in req:
                user[i] = req[i]

            return res('Category Modified', 'success', category=convert_query(category))
        except:
            return res("Category doesn't exist", 'error'), 400

    def get(self, id):
        try:
            category = Category.objects(id=id)[0]
            return res('Retrieved Successfully', 'success', category=convert_query(category))
        except:
            return res("Category doesn't exist", 'error'), 400

    def delete(self, id):
        try:
            category = Category.objects(id=id)
            category.delete()
            return res('Category deleted 💀', 'success', category=convert_query(category))
        except:
            return res("Category doesn't exist", 'error'), 400
