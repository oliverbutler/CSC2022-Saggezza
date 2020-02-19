from flask import request
from flask_restful import Resource
from functions import *
from mongoengine import *
from schema.auth import *
from PIL import Image
from model import User, Request
import datetime
import os
import uuid
import json
import requests
import jwt
import secrets
from flask_httpauth import HTTPTokenAuth

# Connect to mongodb
connect("saggezza_db", host="localhost", port=27017)

# Create auth
auth = HTTPTokenAuth(scheme="Bearer")


@auth.verify_token
def verify_token(token):

    if token == "":
        return False

    # Decode token to access the google_id

    try:
        decode = jwt.decode(token, verify=False)
    except:
        return False

    # Now find the appropriate user
    try:
        user = User.objects.get(id=decode["_id"]["$oid"])
    except User.DoesNotExist:
        return False

    # Try verify the token with this users secret

    try:
        decode = jwt.decode(token, user["secret"])
    except jwt.exceptions.InvalidSignatureError:
        return False

    return True


@auth.error_handler
def auth_error():
    return res("⛔️ Unauthorized Access", "error"), 401


class AuthAPI(Resource):
    # |- /auth
    # |- GET: Verify Current JWT

    @auth.login_required
    def get(self):
        caller = get_bearer_header(request)

        return res("Reached AuthAPI 🎉", "success", user=caller)


class AuthGoogleAPI(Resource):
    # |- /auth/google
    # |- POST: Return JWT from Google idToken

    def post(self):
        req = parse(request)

        errors = AuthGoogleSchema().validate(req)
        if errors:
            return res("😬Errors in request", "alert", errors=errors), 400

        idToken = req["idToken"]

        # Verify idToken against Google

        google_response = requests.get(
            "https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken
        )
        if google_response.status_code != 200:
            return res("⏰idToken denied by Google", "error"), 400

        # Now we know their info is legit lets parse the users information

        decode = eval(google_response.content)

        # Lets see if they already have an account, if not make it.

        try:
            user = User.objects.get(google_id=decode["sub"])
        except User.DoesNotExist:
            user = User(
                first_name=decode["given_name"],
                last_name=decode["family_name"],
                email=decode["email"],
                google_id=decode["sub"],
                google_picture=decode["picture"],
            )

        # If they are still pending, return them back early with a warning
        if user["role"] == "pending":
            return res("Account pending ⏳", "warning")

        # Lets make a secret key for each user and save it for them.

        secret = secrets.token_hex(64)
        user["secret"] = secret
        user.save()

        # Now make the JWT to return to the client for future auth with the server

        payload = convert_query(user, sanitize=True)

        encoded = jwt.encode(payload, secret, algorithm="HS512")

        # encoded is in Bytes so convert to utf-8 for sending

        return res(
            "Created JWT 🎉",
            "success",
            token=encoded.decode("utf-8"),
            user=convert_query(user, sanitize=True),
        )

