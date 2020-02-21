from flask import Blueprint, Flask
from flask_restful import Api

from routes.user import *
from routes.auth import *
from routes.request import *
from routes.category import *
from routes.client import *
from routes.project import *

api_bp = Blueprint("api", __name__, static_url_path="/static", static_folder="static")
api = Api(api_bp)

# Auth

api.add_resource(AuthAPI, "/auth")
api.add_resource(AuthGoogleAPI, "/auth/google")

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

# Category

api.add_resource(CategoryListAPI, "/category")
api.add_resource(CategoryAPI, "/category/<id>")

# Client

api.add_resource(ClientListAPI, "/client")
api.add_resource(ClientAPI, "/client/<id>")

# Project

api.add_resource(ProjectListAPI, "/project")
api.add_resource(ProjectAPI, "/project/<id>")


def create_app(config_filename):
    app = Flask(__name__)
    app.config.from_object(config_filename)

    app.register_blueprint(api_bp)

    return app


if __name__ == "__main__":
    app = create_app("config")
    app.run(debug=True, host="0.0.0.0")
