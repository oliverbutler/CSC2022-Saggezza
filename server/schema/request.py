from marshmallow import Schema, fields, validates, ValidationError
from marshmallow.validate import Length
from functions import *


class RequestListSchema(Schema):
    name = fields.Str(required=True, validate=Length(max=32))
    role = fields.Str(required=True, validate=Length(
        max=32))  # TODO: Add selections for role
    employee = fields.Str(required=True, validate=Length(equal=24))


class RequestSchema(Schema):
    name = fields.Str(validate=Length(max=32))
    employee = fields.Str(validate=Length(equal=24))
    date_created = fields.Str()  # TODO: Not sure how to validate date
    date_submit = fields.Str()
    date_review = fields.Str()
    comment = fields.Str(validate=Length(max=1000))
    status = fields.Str(validate=Length(equal=24))  # TODO: Validate status


class RequestParameterListSchema(Schema):
    category = fields.Str(required=True, validate=Length(max=24))
    name = fields.Str(required=True, validate=Length(max=32))
    amount = fields.Int(required=True)
    # TODO: Not sure how to validate date
    date_expense = fields.Str(required=True)
    billable_client = fields.Bool(required=True)
    payment_method = fields.Str(required=True, validate=Length(max=32))
    description = fields.Str(validate=Length(max=1000))


class RequestParameterSchema(Schema):
    category = fields.Str(validate=Length(max=24))
    name = fields.Str(validate=Length(max=32))
    amount = fields.Int()
    # TODO: Not sure how to validate date
    date_expense = fields.Str()
    billable_client = fields.Bool()
    payment_method = fields.Str(validate=Length(max=32))
    description = fields.Str(validate=Length(max=1000))
