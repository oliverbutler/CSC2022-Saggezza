from flask import Blueprint, Flask
from flask_restful import Api

from routes.user import UserAPI, UserListAPI, UserProfileAPI

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

# User

api.add_resource(UserListAPI, '/user')
api.add_resource(UserAPI, '/user/<id>')
api.add_resource(UserProfileAPI, '/user/<id>/profile')


def create_app(config_filename):
    app = Flask(__name__)
    app.config.from_object(config_filename)

    app.register_blueprint(api_bp)

    return app


if __name__ == "__main__":
    app = create_app("config")
    app.run(debug=True)
