import json
import bcrypt
import jwt
from flask import jsonify
from mongoengine import QuerySet, connect, DoesNotExist, ValidationError
from authlib.jose import JsonWebToken


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
    """Takes a request, from the client, and parses it into a python dictionary, allows either Multipart form data or JSON

    Arguments:
        request {[type]} -- [description]

    Returns:
        [dict] -- The request data
    """
    if "multipart/form-data" in request.headers['Content-Type']:
        return request.form
    if "application/json" in request.headers['Content-Type']:
        return request.json
    return "Bad type"


def res(message: str, type: str, **kwargs):
    """Response from server, ensures the reply from the server is always formatted correctly

    Arguments:
        message {str} -- Message from the client
        type {str} -- Either 'success', 'error' or 'warning'

    Returns:
        [dict] -- Response message
    """
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


def parseJWT(inputJWT: str):
    # return JsonWebToken.decode(jwt, key="")
    return jwt.decode(inputJWT, verify=False)
