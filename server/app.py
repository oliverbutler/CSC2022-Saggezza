from flask import Blueprint, Flask
from flask_restful import Api

from routes.user import *
from routes.category import *
from routes.client import *

api_bp = Blueprint('api', __name__, static_url_path="/static",
                   static_folder="static")
api = Api(api_bp)

# User

api.add_resource(UserListAPI, '/user')
api.add_resource(UserAPI, '/user/<id>')
api.add_resource(UserProfileAPI, '/user/<id>/profile')
api.add_resource(UserRequestListAPI, '/user/<id>/request')
api.add_resource(UserEmployeeListAPI, '/user/<id>/employee')
api.add_resource(UserEmployeeAPI, '/user/<id>/employee/<eid>')

# Category

api.add_resource(CategoryListAPI, '/category')
api.add_resource(CategoryAPI, '/category/<id>')

# Client
api.add_resource(ClientListAPI, '/client')
api.add_resource(ClientAPI, '/client/<id>')


def create_app(config_filename):
    app = Flask(__name__)
    app.config.from_object(config_filename)

    app.register_blueprint(api_bp)

    return app


if __name__ == "__main__":
    app = create_app("config")
    app.run(debug=True, host="0.0.0.0")
