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
import config
from routes.auth import auth


# Connect to mongodb
connect("saggezza_db", host=config.DB_URL, port=27017)


class PushAPI(Resource):
    @auth.login_required
    def post(self):
        caller = get_caller(request)
        req = parse(request)

        if req["token"]:
            caller["push_token"] = req["token"]
            caller.save()
            return res("Successfully stored token", "success")
        else:
            return res("Token not present", "error"), 400

