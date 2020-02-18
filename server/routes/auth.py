from flask import request
from flask_restful import Resource
from functions import *
from mongoengine import *
# from schema.auth import *
from PIL import Image
from model import User, Request
import datetime
import os
import uuid
import json
import requests

# Connect to mongodb
connect('saggezza_db', host='localhost', port=27017)


class AuthAPI(Resource):
    # |- /auth
    # |- POST: Verify Current JWT

    def post(self):
        req = parse(request)

        try:
            decode_token(req['token'])
            return res("Valid JWT", "success")
        except:
            return res('Invalid JWT', 'error')


class AuthGoogleAPI(Resource):
    # |- /auth/google
    # |- POST: Return JWT from Google idToken

    def post(self):
        req = parse(request)

        try:
            token = decode_token(req['idToken'], google=True)
        except:
            return res('OAuth idToken invalid', 'error'), 400

        print('Token Valid')

        try:
            user = User.objects(google_id=token['sub'])[0]
        except:
            secret = gen_secret(64)
            new_user = User(
                first_name=token['given_name'],
                last_name=token['family_name'],
                email=token['email'],
                google_profile_picture=token['picture'],
                role="pending",
                secret=secret,
                google_id=token['sub']
            )
            new_user.save()
            return res("New user added, pending approval", 'success', token=sign_token(convert_query(new_user, sanitize=True), secret))

        print(type(user['secret']))
        return res("OAuth idToken valid", "success", token=sign_token(convert_query(user, sanitize=True), user['secret']).decode("utf-8"))
