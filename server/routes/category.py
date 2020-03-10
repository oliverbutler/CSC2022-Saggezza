from flask import request
from flask_restful import Resource
from functions import *
from mongoengine import *
from schema.category import *
from model import Category

from routes.auth import auth
import config

# Connect to mongodb
connect("saggezza_db", host=config.DB_URL, port=27017)


class CategoryListAPI(Resource):
    # |- /category
    # |- POST: Create a new category
    # \- GET: Return all categories

    @auth.login_required
    def post(self):
        caller = get_caller(request)
        if caller["role"] != "admin":
            return res("⛔️ Must be an admin to create a new category", "error"), 400

        req = parse(request)
        errors = CategorySchema().validate(req)
        if errors:
            return res("Errors in request", "alert", errors=errors), 400
        category = Category(name=req["name"])
        category.save()
        return res(
            "Category created successfully", "success", category=convert_query(category)
        )

    @auth.login_required
    def get(self):
        categories = Category.objects().all()
        return res(
            "All categories returned",
            "success",
            categories=convert_query(categories, list=True),
        )


class CategoryAPI(Resource):
    # |- /category/<id>
    # |- PUT: Update new category
    # |- GET: Return category
    # \- DELETE: Delete category

    @auth.login_required
    def put(self, id):
        caller = get_caller(request)
        if caller["role"] != "admin":
            return res("⛔️ Must be an admin to update a category", "error"), 400
        try:
            req = parse(request)
            category = Category.objects(id=id)[0]

            for i in req:
                category[i] = req[i]

            return res("Category Modified", "success", category=convert_query(category))
        except:
            return res("Category doesn't exist", "error"), 400

    @auth.login_required
    def get(self, id):

        try:
            category = Category.objects(id=id)[0]
            return res(
                "Retrieved Successfully", "success", category=convert_query(category)
            )
        except:
            return res("Category doesn't exist", "error"), 400

    @auth.login_required
    def delete(self, id):
        caller = get_caller(request)
        if caller["role"] != "admin":
            return res("⛔️ Must be an admin delete a category", "error"), 400

        try:
            category = Category.objects(id=id)
            category.delete()
            return res(
                "Category deleted 💀", "success", category=convert_query(category)
            )
        except:
            return res("Category doesn't exist", "error"), 400
