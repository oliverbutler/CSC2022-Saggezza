import json
import bcrypt
from flask import jsonify
from mongoengine import QuerySet, connect, DoesNotExist, ValidationError


def gen_hash(password: str):
    """Takes a string and generates the hash using bcrypt

    Arguments:
        password {str} -- Input plaintext password

    Returns:
        hash [type] -- The hashed password
    """
    salt = bcrypt.gensalt(rounds=12)
    return bcrypt.hashpw(password.encode('utf8'), salt)


def parse(request):
    if "multipart/form-data" in request.headers['Content-Type']:
        return request.form
    if "application/json" in request.headers['Content-Type']:
        return request.json
    return "Bad type"


def res(message: str, type: str, **kwargs):
    body = {}
    body['status'] = {
        'text': message,
        'type': type
    }
    for key, value in kwargs.items():
        body[key] = value
    return body


def convert_query(querySet: QuerySet) -> QuerySet:
    return json.loads(querySet.to_json())
