import json
import jwt
import secrets
import requests
from flask import jsonify
from mongoengine import QuerySet, connect, DoesNotExist, ValidationError
from model import User, Request

connect('saggezza_db', host='localhost', port=27017)


def gen_secret(length: int):
    return secrets.token_hex(length)


def sign_token(payload, secret: str):
    # return jwt.encode(payload, secret, algorithm="HS512")
    token = jwt.encode(payload, 'secret', algorithm="HS256")
    print(token)
    return token


def decode_token(token, google=False):
    if(google):
        print('Google auth')
        google_res = requests.get(
            "https://oauth2.googleapis.com/tokeninfo?id_token=" + token)
        print(google_res)
        print('done')
        print(google_res.status_code)
        if google_res.status_code != 200:
            return ValueError('idToken invalid')
        else:
            return jwt.decode(token, verify=False)
    else:
        print('Not Google auth')
        # If its a local JWT, verify it against its claimed user ID
        decoded = jwt.decode(jwt, verify=False)
        console.log(decoded['_id'])
        user = User.objects(id=decoded['_id'])[0]
        return jwt.decode(jwt, user['secret'])


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


def convert_query(querySet: QuerySet, sanitize=False) -> QuerySet:
    if(sanitize):
        querySet['secret'] = None
    return json.loads(querySet.to_json())
