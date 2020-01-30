from flask import Blueprint, Flask
from flask_restful import Api

from routes.user import User

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

api.add_resource(User, '/user')


def create_app(config_filename):
    app = Flask(__name__)
    app.config.from_object(config_filename)

    app.register_blueprint(api_bp)

    return app


if __name__ == "__main__":
    app = create_app("config")
    app.run(debug=True)
