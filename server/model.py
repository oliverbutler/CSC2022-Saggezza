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
    ReferenceField,
    ObjectIdField,
)
from bson import json_util, ObjectId

import datetime


class Category(Document):
    name = StringField(requried=True, max_length=64)

    def to_json(self):
        decode = {"id": str(self.id), "name": str(self.name)}
        return decode


class Client(Document):
    name = StringField(required=True, max_length=64)
    email = EmailField()

    def to_json(self):
        decode = {"id": str(self.id), "name": str(self.name)}
        if self.email:
            decode["email"] = str(self.email)
        return decode


class Project(Document):
    name = StringField(required=True, max_length=64)

    def to_json(self):
        decode = {"id": str(self.id), "name": str(self.name)}
        return decode


class RequestParameter(EmbeddedDocument):
    _id = ObjectIdField(default=lambda: ObjectId())
    category = ReferenceField(Category, required=True)
    name = StringField(required=True, max_length=64)
    amount = DecimalField(required=True)
    date_expense = DateTimeField(required=True)
    billable_client = BooleanField(required=True)
    payment_method = StringField(required=True, choices=["corporate", "own"])
    file_evidence = StringField()
    description = StringField(max_length=1080)
    file = StringField(default="")

    def to_json(self):
        decode = {
            "id": str(self._id),
            "category": {"id": str(self.category.id), "name": str(self.category.name)},
            "name": str(self.name),
            "amount": float(self.amount),
            "billable_client": bool(self.billable_client),
            "payment_method": str(self.payment_method),
        }

        try:
            decode["date_expense"] = {
                "date": str(self.date_expense),
                "epoch": int(round(self.date_expense.timestamp() * 1000)),
            }
        except:
            decode["date_expense"] = "Still Parsing..."

        if self.file_evidence:
            decode["file_evidence"] = str(self.file_evidence)
        if self.description:
            decode["description"] = str(self.description)

        return decode


class User(Document):
    first_name = StringField(required=True, max_length=64)
    last_name = StringField(default="", max_length=64)
    email = EmailField(required=True, unique=True)
    profile_picture = StringField(default="")
    role = StringField(
        default="pending", options=["pending", "employee", "manager", "admin"]
    )

    # Auth
    secret = StringField(min_length=32)

    # Google
    google_id = StringField(max_length=64)
    google_picture = StringField()

    # Employee
    request_list = ListField(ReferenceField("Request"))

    # Manager
    employees = ListField(ReferenceField("self"))
    client = ReferenceField(Client)
    project = ReferenceField(Project)
    push_token = StringField()

    def to_json(self):
        decode = {
            "id": str(self.id),
            "first_name": str(self.first_name),
            "last_name": str(self.last_name),
            "email": str(self.email),
            "profile_picture": str(self.profile_picture),
            "role": str(self.role),
        }
        if self.google_picture:
            decode["google_picture"] = str(self.google_picture)
        if len(self.request_list) > 0:
            requests = []
            for i in self.request_list:
                requests.append(str(i.id))
                decode["request_list"] = requests
        if len(self.employees) > 0:
            employees = []
            for i in self.employees:
                employees.append(str(i.id))
                decode["employees"] = employees
        if self["client"] != None:
            decode["client"] = self.client.to_json()
        if self["project"] != None:
            decode["project"] = self.project.to_json()

        return decode


class Request(Document):
    name = StringField(required=True, max_length=64)
    employee = ReferenceField(User, required=True)
    date_created = DateTimeField(default=datetime.datetime.now())
    date_submit = DateTimeField()
    date_review = DateTimeField()
    comment = StringField()
    status = StringField(
        default="draft", choices=["approved", "declined", "pending", "draft"]
    )
    request_parameter_list = EmbeddedDocumentListField(RequestParameter)

    def to_json(self):
        decode = {
            "id": str(self.id),
            "name": str(self.name),
            "employee": str(self.employee.id),
            "date_created": {
                "date": str(self.date_created),
                "epoch": int(round(self.date_created.timestamp() * 1000)),
            },
            "status": str(self.status),
        }
        if self.date_submit:
            try:
                decode["date_submit"] = {
                    "date": str(self.date_submit),
                    "epoch": int(round(self.date_submit.timestamp() * 1000)),
                }
            except:
                decode["date_submit"] = "Still Parsing..."
        if self.date_review:
            try:
                decode["date_review"] = {
                    "date": str(self.date_review),
                    "epoch": int(round(self.date_review.timestamp() * 1000)),
                }
            except:
                decode["date_review"] = "Still Parsing..."
        if self.comment:
            decode["comment"] = str(self.comment)
        if len(self.request_parameter_list) > 0:
            requests = []
            for i in self.request_parameter_list:
                requests.append(i.to_json())
                decode["request_parameter_list"] = requests
        return decode
