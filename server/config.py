import os
from mongoengine import *


basedir = os.path.abspath(os.path.dirname(__file__))
DB_URL = "mongodb+srv://admin:USQA4quVlQkPetde@cluster0-myncl.mongodb.net/saggezza_db?retryWrites=true&w=majority"  # USQA4quVlQkPetde

# disconnect()
# connect("saggezza_db", host=DB_URL, port=27017)

