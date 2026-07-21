from pathlib import Path
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

BASE_DIR = Path(__file__).resolve().parent

KEY_PATH = BASE_DIR / "serviceAccountKey.json"

# Initialize Firebase only once
if not firebase_admin._apps:
    cred = credentials.Certificate(KEY_PATH)
    firebase_admin.initialize_app(cred)

db = firestore.client()