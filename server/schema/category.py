from marshmallow import Schema, fields, validates, ValidationError
from marshmallow.validate import Length
from functions import *


class CategorySchema(Schema):
    name = fields.Str(required=True)
