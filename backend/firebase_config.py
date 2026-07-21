import os
import json
import firebase_admin

from firebase_admin import credentials
from firebase_admin import firestore

firebase_credentials = os.getenv("FIREBASE_CREDENTIALS")

cred_dict = json.loads(firebase_credentials)

if not firebase_admin._apps:
    cred = credentials.Certificate(cred_dict)
    firebase_admin.initialize_app(cred)

db = firestore.client()