from marshmallow import Schema, fields, validates, ValidationError
from marshmallow.validate import Length
from functions import *


class ProjectListSchema(Schema):
    name = fields.Str(required=True)
    email = fields.Email()


class ProjectSchema(Schema):
    name = fields.Str()
    email = fields.Email()
