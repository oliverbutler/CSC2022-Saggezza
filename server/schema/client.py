from marshmallow import Schema, fields, validates, ValidationError
from marshmallow.validate import Length
from functions import *


class ClientListSchema(Schema):
    name = fields.Str(required=True, validate=Length(max=32))
    email = fields.Email(validate=Length(max=32))


class ClientSchema(Schema):
    name = fields.Str(validate=Length(max=32))
    email = fields.Email(validate=Length(max=32))
