from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from firebase_config import db
from services.predictor import predict_energy
from models.prediction import PredictionRequest
from firebase_admin import firestore
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"

app = FastAPI(
    title="AI Energy Consumption Prediction API",
    version="1.0.0",
    description="Predict daily household energy consumption using XGBoost."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount(
    "/assets",
    StaticFiles(directory=STATIC_DIR / "assets"),
    name="assets"
)

# =====================================================
# Home
# =====================================================

@app.get("/")
def serve_frontend():
    return FileResponse(STATIC_DIR / "index.html")

# =====================================================
# Health Check
# =====================================================

@app.get("/health")
def health():
    return {
        "status": "Healthy"
    }

# =====================================================
# Prediction API
# =====================================================

@app.post("/predict")
def predict(request: PredictionRequest):
    
    data = request.model_dump()

    prediction = predict_energy(data)
    
    document = {
        **data,
        "prediction": round(prediction, 3),
        "timestamp": firestore.SERVER_TIMESTAMP
    }

    db.collection("predictions").add(document)

    return {
        "prediction": round(prediction, 3),
        "unit": "kWh",
        "saved": True
    }
    
    
@app.get("/predictions")
def get_predictions():

    docs = (
        db.collection("predictions")
        .order_by("timestamp", direction=firestore.Query.DESCENDING)
        .limit(20)
        .stream()
    )

    prediction_list = []

    for doc in docs:

        data = doc.to_dict()

        # Convert Firestore Timestamp to string
        if "timestamp" in data and data["timestamp"]:
            data["timestamp"] = data["timestamp"].isoformat()

        prediction_list.append({
            "id": doc.id,
            **data
        })

    return prediction_list


@app.get("/{full_path:path}")
def react_router(full_path: str):
    return FileResponse(STATIC_DIR / "index.html")