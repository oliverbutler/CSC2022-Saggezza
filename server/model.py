from mongoengine import (
    BooleanField,
    DecimalField,
    EmailField,
    StringField,
    BinaryField,
    Document,
    EmbeddedDocument,
    IntField,
    DateTimeField,
    URLField,
    EmbeddedDocumentField,
    GeoPointField,
    EmbeddedDocumentListField,
    ListField,
    ReferenceField
)
from bson import json_util
import datetime


class Category(Document):
    name = StringField(requried=True, max_length=64)


class Client(Document):
    name = StringField(required=True, max_length=64)
    email = EmailField()


class Project(Document):
    name = StringField(required=True, max_length=64)


class RequestParameter(EmbeddedDocument):
    category = ReferenceField(Category, required=True)
    name = StringField(required=True, max_length=64)
    amount = DecimalField(required=True)
    date_expense = DateTimeField(required=True)
    billable_client = BooleanField(required=True)
    payment_method = StringField(required=True, choices=["corporate", "own"])
    file_evidence = StringField()
    description = StringField(max_length=1080)


class User(Document):
    first_name = StringField(required=True, max_length=64)
    last_name = StringField(required=True, max_length=64)
    email = EmailField(required=True, unique=True)
    profile_picture = StringField(default="/default-profile.jpg")
    role = StringField(required=True, options=["employee", "manager", "admin"])

    # Employee
    request_list = ListField(ReferenceField('Request'))

    # Manager
    employees = ListField(ReferenceField('self'))
    client = ReferenceField(Client)
    project = ReferenceField(Project)


class Request(Document):
    name = StringField(required=True, max_length=64)
    employee = ReferenceField(User, required=True)
    date_created = DateTimeField(default=datetime.datetime.now())
    date_submit = DateTimeField()
    date_review = DateTimeField()
    comment = StringField()
    status = StringField(default="draft", choices=[
                         "approved", "declined", "pending", "draft"])
    request_parameter_list = EmbeddedDocumentListField(RequestParameter)
