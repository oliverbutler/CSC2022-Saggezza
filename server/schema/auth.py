from marshmallow import Schema, fields, validates, ValidationError
from marshmallow.validate import Length
from functions import *


class AuthGoogleSchema(Schema):
    idToken = fields.Str(required=True)
