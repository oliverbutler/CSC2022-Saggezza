from flask import request
from flask_restful import Resource
from functions import *
from mongoengine import *
from schema.project import *

from model import Project
from routes.auth import auth


# Connect to mongodb
connect("saggezza_db", host="localhost", port=27017)


class ProjectListAPI(Resource):
    # |- /project
    # |- POST: Create a new project
    # \- GET: Return all projects
    @auth.login_required
    def post(self):
        caller = get_caller(request)
        if caller["role"] != "admin":
            return res("⛔️ Only an admin can add a project", "error"), 401

        req = parse(request)
        errors = ProjectListSchema().validate(req)
        if errors:
            return res("Errors in request", "alert", errors=errors), 400
        project = Project(name=req["name"])
        project.save()
        return res(
            "Project created successfully", "success", project=convert_query(project)
        )

    @auth.login_required
    def get(self):
        projects = Project.objects().all()
        return res(
            "All projects returned",
            "success",
            projects=convert_query(projects, list=True),
        )


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

        req = parse(request)
        errors = ProjectSchema().validate(req)
        if errors:
            return res("Errors in request", "alert", errors=errors), 400
        try:
            project = Project.objects(id=id)[0]
        except:
            return res("Project doesn't exist", "error"), 400
        for i in req:
            project[i] = req[i]

        project.save()

        return res("Project Modified", "success", project=convert_query(project))

    @auth.login_required
    def get(self, id):
        caller = get_bearer(request)
        if caller["role"] != "manager":
            return res("⛔️ Must be a manager to view a project", "error"), 400
        try:
            project = Project.objects(id=id)[0]
            return res(
                "Retrieved Successfully", "success", project=convert_query(project)
            )
        except:
            return res("Project doesn't exist", "error"), 400

    @auth.login_required
    def delete(self, id):
        caller = get_bearer(request)
        if caller["role"] != "admin":
            return res("⛔️ Must be an admin to delete a project", "error"), 400
        try:
            project = Project.objects(id=id)
            project.delete()
            return res("Project deleted 💀", "success", project=convert_query(project))
        except:
            return res("Project doesn't exist", "error"), 400
