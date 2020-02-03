import json
import bcrypt
from flask import jsonify


def gen_hash(password: str):
    """Takes a string and generates the hash using bcrypt

    Arguments:
        password {str} -- Input plaintext password

    Returns:
        hash [type] -- The hashed password
    """
    salt = bcrypt.gensalt(rounds=12)
    return bcrypt.hashpw(password.encode('utf8'), salt)
