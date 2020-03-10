from flask import request
from flask_restful import Resource
from functions import *
from mongoengine import *
from schema.user import *
from PIL import Image
from model import User, Request, Client, Project
import datetime
import os
import uuid
import config
from routes.auth import auth

# Connect to mongodb
connect("saggezza_db", host=config.DB_URL, port=27017)

UPLOAD_FOLDER = "./static/profile/"
ALLOWED_EXTENSIONS = set(["jpg"])


class UserListAPI(Resource):
    # |- /user
    # |- POST: Create a new user
    # \- GET: Return all users

    @auth.login_required
    def post(self):
        caller = get_bearer(request)
        if caller["role"] != "admin":
            return res("⛔️ Must be an admin to create a user", "error"), 401

        req = parse(request)
        errors = UserListSchema().validate(req)
        if errors:
            return res("Errors in request", "alert", errors=errors), 400

        user = User(
            first_name=req["first_name"].capitalize(),
            last_name=req["last_name"].capitalize(),
            email=req["email"].lower(),
            role=req["role"],
        )
        user.save()
        return res("User created", "success", user=convert_query(user))

    @auth.login_required
    def get(self):
        caller = get_bearer(request)
        if caller["role"] == "admin":
            users = User.objects().all()
            return res(
                "All users returned", "success", users=convert_query(users, list=True)
            )

        elif caller["role"] == "manager":
            employees = caller["employees"]
            return res(
                "Your employees returned",
                "success",
                employees=convert_query(employees, list=True),
            )

        return res("⛔️Not Authorized", "error"), 401


class UserAPI(Resource):
    # |- /user/<id>
    # |- PUT: Edit user
    # |- DELETE: Delete user
    # \- GET: Return user

    @auth.login_required
    def put(self, id):
        caller = get_bearer(request)
        if caller["id"] == id:
            pass
        elif caller["role"] != "admin":
            return res("⛔️ Must be an admin to edit another user", "error"), 400

        req = parse(request)
        errors = UserSchema().validate(req)
        if errors:
            return res("Errors in request", "alert", errors=errors), 400

        try:
            user = User.objects(id=id)[0]
        except:
            return res("User doesn't exist", "error"), 400

        for i in req:
            if i == "role" and caller["role"] != "admin":
                return res("⛔️ Cannot change your own role", "error"), 400

            if i == "role":
                # If changing to an admin, remove fields they shouldn't have
                if req[i] in [
                    "admin",
                    "pending",
                ]:  # If we make them admin or pending remove all their fields
                    user["employees"] = []
                    user["request_list"] = []
                    user["client"] = None
                    user["project"] = None
                if req[i] == "employee":
                    user["employees"] = []
                    user["client"] = None
                    user["project"] = None
                if req[i] == "manager":
                    user["request_list"]

            if i == "project":
                if user["role"] == "manager":
                    try:
                        project = Project.objects().get(id=req[i])
                    except:
                        return res("Invalid project ID", "error")
                    user["project"] = project
                else:
                    return res(user["role"] + " cant have a project", "error"), 400
            elif i == "client":
                if user["role"] == "manager":
                    try:
                        client = Client.objects().get(id=req[i])
                    except:
                        return res("Invalid project ID", "error")
                    user["client"] = client
                else:
                    return res(user["role"] + " cant have a client", "error"), 400
            else:
                user[i] = req[i]

        user.save()

        return res("User modified", "success", user=convert_query(user))

    @auth.login_required
    def delete(self, id):

        caller = get_bearer(request)
        if caller["role"] != "admin":
            return res("⛔️ Must be an admin to delete another user", "error"), 400

        try:
            user = User.objects(id=id)[0]
        except:
            return res("User doesn't exist", "error"), 400

        user.delete()
        return res("User deleted 💀", "success")

    @auth.login_required
    def get(self, id):

        caller = get_bearer(request)
        if caller["role"] != "admin":
            return res("⛔️ Must be an admin to delete another user", "error"), 400

        try:
            user = User.objects(id=id)[0]
            return res("Retrieved Successfully", "success", user=convert_query(user))
        except:
            return res("User doesn't exist", "error"), 400


class UserProfileAPI(Resource):
    # |- /user/<id>/profile
    # |- POST: Upload new profile picture
    # \- DELETE: Delete profile picture

    def post(self, id):
        try:
            user = User.objects(id=id)[0]
        except:
            return res("User doesn't exist", "error"), 400
        if "file" in request.files:
            file = request.files["file"]
            size = 256, 256
            im = Image.open(file)
            im.thumbnail(size)

            if not os.path.exists(UPLOAD_FOLDER):
                os.makedirs(UPLOAD_FOLDER)

            name = uuid.uuid4().hex

            im.save(UPLOAD_FOLDER + name + ".jpg")
            user["profile_picture"] = "/profile/" + name + ".jpg"
            user.save()
            return res("Profile image added successfully", "success")
        else:
            return res("No file in the request called file", "error"), 400

    def delete(self, id):
        try:
            user = User.objects(id=id)[0]
            if os.path.exists("./static" + user["profile_picture"]):
                os.remove(os.path.join("./static" + user["profile_picture"]))
                user["profile_picture"] = "/default-profile.jpg"
                user.save()
                return res("Profile image deleted", "success")
            else:
                return res("File does not exist", "error"), 400
        except:
            return res("User doesn't exist", "error"), 400


class UserEmployeeListAPI(Resource):
    # |- /user/<id>/employee NOTE: User must be a Manager
    # |- POST: Add new employee
    # |- GET: Get all employes of a manager NOTE: User must be an admin

    @auth.login_required
    def post(self, id):
        caller = get_bearer(request)
        if caller["role"] != "admin":
            return (
                res("⛔️ Must be an admin to add an employee to a manager", "error"),
                400,
            )

        req = parse(request)
        errors = UserEmployeeListSchema().validate(req)
        if errors:
            return res("Errors in request", "alert", errors=errors), 400
        try:
            user = User.objects(id=id)[0]
        except:
            return res("User doesn't exist", "error"), 400

        if user["role"] == "manager":
            try:
                employee = User.objects(id=req["employee"])[0]
                user["employees"].append(employee)
                user.save()
                return res("Employee Added", "success", user=convert_query(user))
            except:
                return res("Employee's uuid is not valid", "error"), 400
        else:
            return res("User is not a manager", "error"), 400

    @auth.login_required
    def get(self):
        caller = get_caller(request)
        if caller["role"] != "admin":
            return (
                res(
                    "⛔️ Must be an admin to see a list of manager's employees", "error"
                ),
                400,
            )

        employees = user["employees"]
        return res(
            "Managers employees returned",
            "success",
            employees=convert_query(employees, list=True),
        )


class UserEmployeeAPI(Resource):
    # |- /user/<id>/employee/<eid> NOTE: User must be a Manager
    # |- DELETE: Delete employee

    @auth.login_required
    def delete(self, id, eid):
        caller = get_bearer(request)
        if caller["role"] != "admin":
            return (
                res("⛔️ Must be an admin to add an employee to a manager", "error"),
                400,
            )

        try:
            user = User.objects(id=id)[0]
        except:
            return res("User doesn't exist", "error"), 400

        try:
            employee = User.objects().get(id=eid)
        except:
            return res("Employee doesn't exist", "error"), 400

        if user["role"] == "manager":
            try:
                user["employees"].remove(employee)
                user.save()
                return res("Employee deleted", "success", user=convert_query(user))
            except:
                return res("Employee not found", "error"), 400
