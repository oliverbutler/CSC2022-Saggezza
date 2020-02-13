from marshmallow import Schema, fields, validates, ValidationError
from marshmallow.validate import Length
from functions import *


class UserListSchema(Schema):
    email = fields.Email(required=True, validate=Length(max=32))
    first_name = fields.Str(required=True, validate=Length(max=32))
    last_name = fields.Str(required=True, validate=Length(max=32))
    role = fields.Str(required=True)


class UserSchema(Schema):
    email = fields.Email(validate=Length(max=32))
    first_name = fields.Str(validate=Length(max=32))
    last_name = fields.Str(validate=Length(max=32))
    role = fields.Str()

class UserEmployeeListSchema(Schema):
    uuid = fields.Str(required=True, validate=Length(max=32))