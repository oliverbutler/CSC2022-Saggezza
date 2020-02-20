from flask import request
from flask_restful import Resource
from functions import *
from mongoengine import *
from schema.project import *

from model import Project
from routes.auth import auth

# Connect to mongodb
connect('saggezza_db', host='localhost', port=27017)


@auth.login_required
class ProjectListAPI(Resource):
    # |- /project
    # |- POST: Create a new project
    # \- GET: Return all projects
    def post(self):
        caller = get_caller(request)
        if caller["role"] != "admin":
            return res("⛔️ Only an admin can add a project", "error"), 401

        req = parse(request)
        errors = ProjectListSchema().validate(req)
        if errors:
            return res('Errors in request', 'alert', errors=errors), 400
        project = Project(
            name=req['name']
        )
        project.save()
        return res('Project created successfully', 'success', project=convert_query(project))

    def get(self):
        categories = Project.objects().all()
        return res('All categories returned', 'success', categories=convert_query(categories))


class ProjectAPI(Resource):
    # |- /project/<id>
    # |- PUT: Update new project
    # |- GET: Return project
    # \- DELETE: Delete project

    def put(self, id):
        try:
            req = parse(request)
            errors = ProjectSchema().validate(req)
            if errors:
                return res('Errors in request', 'alert', errors=errors), 400
            project = Project.objects(id=id)

            for i in req:
                user[i] = req[i]

            return res('Project Modified', 'success', project=convert_query(project))
        except:
            return res("Project doesn't exist", 'error'), 400

    def get(self, id):
        try:
            project = Project.objects(id=id)[0]
            return res('Retrieved Successfully', 'success', project=convert_query(project))
        except:
            return res("Project doesn't exist", 'error'), 400

    def delete(self, id):
        try:
            project = Project.objects(id=id)
            project.delete()
            return res('Project deleted 💀', 'success', project=convert_query(project))
        except:
            return res("Project doesn't exist", 'error'), 400
