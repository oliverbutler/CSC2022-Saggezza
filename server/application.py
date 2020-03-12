from flask import Blueprint, Flask
from flask_restful import Api

from routes.auth import *
from routes.category import *
from routes.client import *
from routes.project import *
from routes.request import *
from routes.user import *
from routes.push import *

import sentry_sdk

sentry_sdk.init("https://7d7d994df12b4ca685424cf0a38927b1@sentry.io/4365952")

application = Flask(__name__)

api_bp = Blueprint("application", __name__)
api = Api(api_bp)

# Auth

api.add_resource(AuthAPI, "/auth")
api.add_resource(AuthGoogleAPI, "/auth/google")

# ----------------------------------- Push ----------------------------------- #

api.add_resource(PushAPI, "/push")

# User

api.add_resource(UserListAPI, "/user")
api.add_resource(UserAPI, "/user/<id>")
api.add_resource(UserProfileAPI, "/user/<id>/profile")
api.add_resource(UserEmployeeListAPI, "/user/<id>/employee")
api.add_resource(UserEmployeeAPI, "/user/<id>/employee/<eid>")


# Request

api.add_resource(RequestListAPI, "/request")
api.add_resource(RequestAPI, "/request/<id>")
api.add_resource(RequestParameterListAPI, "/request/<id>/parameter")
api.add_resource(RequestParameterAPI, "/request/<id>/parameter/<pid>")
api.add_resource(RequestParameterAPIFile, "/request/<id>/parameter/<pid>/file")

# Category

api.add_resource(CategoryListAPI, "/category")
api.add_resource(CategoryAPI, "/category/<id>")

# Client

api.add_resource(ClientListAPI, "/client")
api.add_resource(ClientAPI, "/client/<id>")

# Project

api.add_resource(ProjectListAPI, "/project")
api.add_resource(ProjectAPI, "/project/<id>")


@application.route("/")
def hello_world():
    return "Hello, World!"


application.register_blueprint(api_bp)


# run the app.
if __name__ == "__main__":
    application.run(debug=True)
