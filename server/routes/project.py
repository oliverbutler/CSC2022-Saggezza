from flask import request
from flask_restful import Resource
from functions import *
from mongoengine import *
from schema.project import *

from model import Project



# Connect to mongodb
connect('saggezza_db', host='localhost', port=27017)


class ProjectListAPI(Resource):
    # |- /project
    # |- POST: Create a new project
    # \- GET: Return all projects
    def post(self):
        req = parse(request)
        errors = ProjectListSchema().validate(req)
        if errors:
            return res('Errors in request', 'alert', errors=errors), 400
        project = Project(
            name=req['name']
        )
        project.save()
        return res('Project created successfully', 'success', project=convert_query(project))

    @auth.login_required
    def get(self):
        caller = get_bearer(request)
        if caller["role"] != "admin":
            return res("⛔️ Must be an admin to see all projects", "error"), 400
        categories = Project.objects().all()
        return res('All categories returned', 'success', categories=convert_query(categories))


class ProjectAPI(Resource):
    # |- /project/<id>
    # |- PUT: Update new project
    # |- GET: Return project
    # \- DELETE: Delete project

    @auth.login_required
    def put(self, id):
        caller = get_caller(request)
        if caller["role"] != "admin":
            return res("⛔️ Must be an admin to update a project", "error"), 400
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

    @auth.login_required
    def get(self, id):
        caller = get_bearer(request)
        if caller["role"] != "manager":
            return res("⛔️ Must be a manager to view a project", "error"), 400
        try:
            project = Project.objects(id=id)[0]
            return res('Retrieved Successfully', 'success', project=convert_query(project))
        except:
            return res("Project doesn't exist", 'error'), 400

    @auth.login_required
    def delete(self, id):
        caller = get_bearer(request)
        if caller["role"] != "admin":
            return res("⛔️ Must be an admin to delete a project", "error"), 400
        try:
            project = Project.objects(id=id)
            project.delete()
            return res('Project deleted 💀', 'success', project=convert_query(project))
        except:
            return res("Project doesn't exist", 'error'), 400
