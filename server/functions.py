import json
import jwt
import secrets
import requests
from flask import jsonify
from mongoengine import QuerySet, connect, DoesNotExist, ValidationError
from model import User, Request

connect("saggezza_db", host="localhost", port=27017)


def get_bearer_header(request):
    bearer_header = request.headers.environ["HTTP_AUTHORIZATION"]
    bearer_header = bearer_header.replace("Bearer ", "")

    return jwt.decode(bearer_header, verify=False)


def parse(request):
    """Takes a request, from the client, and parses it into a python dictionary, allows either Multipart form data or JSON

    Arguments:
        request {[type]} -- [description]

    Returns:
        [dict] -- The request data
    """
    if "multipart/form-data" in request.headers["Content-Type"]:
        return request.form
    if "application/json" in request.headers["Content-Type"]:
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
    body["status"] = {"text": message, "type": type}
    for key, value in kwargs.items():
        body[key] = value
    return body


def convert_query(querySet: QuerySet, sanitize=False) -> QuerySet:
    if sanitize:
        querySet["secret"] = None
    return json.loads(querySet.to_json())
