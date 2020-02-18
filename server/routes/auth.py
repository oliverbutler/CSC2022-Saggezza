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
import requests

# Connect to mongodb
connect('saggezza_db', host='localhost', port=27017)


class AuthAPI(Resource):
    # |- /auth
    # |- POST: Process token

    def post(self):
        req = parse(request)

        try:
            # TODO: Not checking it is valid offline
            jwt = parseJWT(req['idToken'])
        except:
            return res('Invalid JWT', 'error')
        try:
            user = User.objects(google_id=jwt['sub'])[0]
        except:

            # Check with Google that this token is valid
            google_res = requests.get(
                "https://oauth2.googleapis.com/tokeninfo?id_token=" + req['idToken'])
            if google_res.status_code != 200:
                return res('idToken not validated against Google', 'error')

            new_user = User(
                first_name=jwt['given_name'],
                last_name=jwt['family_name'],
                email=jwt['email'],
                google_profile_picture=jwt['picture'],
                role="pending",
                google_id=jwt['sub']
            )
            new_user.save()
            return res("New user added", 'success', user=convert_query(new_user))

        return res("Valid", "success", user=convert_query(user))
