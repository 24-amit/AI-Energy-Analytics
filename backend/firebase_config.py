import os
import json
from pathlib import Path
import firebase_admin
from firebase_admin import credentials, firestore

BASE_DIR = Path(__file__).resolve().parent
KEY_PATH = BASE_DIR / "serviceAccountKey.json"

firebase_credentials_env = os.getenv("FIREBASE_CREDENTIALS")

cred = None

if firebase_credentials_env:
    try:
        cred_dict = json.loads(firebase_credentials_env)
        cred = credentials.Certificate(cred_dict)
    except Exception as e:
        print(f"Error parsing FIREBASE_CREDENTIALS env var: {e}")

if not cred and KEY_PATH.exists():
    try:
        cred = credentials.Certificate(str(KEY_PATH))
    except Exception as e:
        print(f"Error loading {KEY_PATH}: {e}")

if not firebase_admin._apps:
    if cred:
        firebase_admin.initialize_app(cred)
    else:
        print("Warning: Firebase credentials not found. Initializing default app.")
        firebase_admin.initialize_app()

try:
    db = firestore.client()
except Exception as e:
    print(f"Firestore client initialization error: {e}")
    db = None
