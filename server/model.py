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
)


class Request(EmbeddedDocument):
    name = StringField(required=True, max_length=64)
    date_submit = DateTimeField(required=True)
    status = StringField(required=True, choices=[
                         "approved", "declined", "pending"])
    category = ListField(StringField)


class User(Document):
    first_name = StringField(required=True, max_length=64)
    last_name = StringField(required=True, max_length=64)
    email = EmailField(required=True, unique=True)
    token = StringField()
<<<<<<< HEAD
    profile_picture = StringField(default="/default-profile.jpg")
    role = StringField(required=True, options=["employee", "manager", "admin"])
=======
    profile_picture = StringField(default="profile")
    role = StringField(required=True, choices=["employee", "manager", "admin"])
>>>>>>> 78a52fe33abdf310ad9750fadefb148523ec13e7

    # Employee
    request_list = EmbeddedDocumentListField(Request)

    # Manager
    employees = ListField(StringField)
    client = StringField()
    project = StringField()


class Category(Document):
    name = StringField(required=True, max_length=64)
    amount = DecimalField(required=True)
    date_expense = DateTimeField(required=True)
    billable_client = BooleanField(required=True)
    payment_method = StringField(required=True, choices=["corporate", "own"])
    file_evidence = StringField()
    description = StringField(max_length=1080)


class Client(Document):
    name = StringField(required=True, max_length=64)
    email = EmailField()


class Project(Document):
    name = StringField(required=True, max_length=64)
