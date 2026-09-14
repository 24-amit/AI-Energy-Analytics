from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from firebase_config import db
from services.predictor import predict_energy
from models.prediction import PredictionRequest
from firebase_admin import firestore
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
from typing import Optional

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"

app = FastAPI(
    title="AI Energy Consumption Prediction API",
    version="1.0.0",
    description="Predict daily household energy consumption using XGBoost."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if (STATIC_DIR / "assets").exists():
    app.mount(
        "/assets",
        StaticFiles(directory=STATIC_DIR / "assets"),
        name="assets"
    )

# =====================================================
# Home, Favicon & Health
# =====================================================

@app.get("/health")
def health():
    return {
        "status": "Healthy",
        "service": "AI Energy Consumption Forecasting API",
        "model": "XGBoost Regressor"
    }

@app.get("/favicon.ico")
def get_favicon_ico():
    fav = STATIC_DIR / "favicon.svg"
    if fav.exists():
        return FileResponse(fav, media_type="image/svg+xml")
    return {"message": "Favicon not found"}

@app.get("/favicon.svg")
def get_favicon_svg():
    fav = STATIC_DIR / "favicon.svg"
    if fav.exists():
        return FileResponse(fav, media_type="image/svg+xml")
    return {"message": "Favicon not found"}

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

    try:
        db.collection("predictions").add(document)
        saved = True
    except Exception as e:
        print(f"Firestore save error: {e}")
        saved = False

    return {
        "prediction": round(prediction, 3),
        "unit": "kWh",
        "saved": saved
    }

@app.get("/predictions")
def get_predictions(limit: int = Query(50, ge=1, le=100)):
    try:
        docs = (
            db.collection("predictions")
            .order_by("timestamp", direction=firestore.Query.DESCENDING)
            .limit(limit)
            .stream()
        )

        prediction_list = []
        for doc in docs:
            data = doc.to_dict()
            if "timestamp" in data and data["timestamp"]:
                try:
                    data["timestamp"] = data["timestamp"].isoformat()
                except AttributeError:
                    data["timestamp"] = str(data["timestamp"])

            prediction_list.append({
                "id": doc.id,
                **data
            })

        return prediction_list
    except Exception as e:
        print(f"Error fetching predictions: {e}")
        return []

@app.get("/analytics/summary")
def get_analytics_summary():
    try:
        docs = (
            db.collection("predictions")
            .order_by("timestamp", direction=firestore.Query.DESCENDING)
            .limit(100)
            .stream()
        )
        prediction_list = []
        for doc in docs:
            data = doc.to_dict()
            if "timestamp" in data and data["timestamp"]:
                try:
                    data["timestamp"] = data["timestamp"].isoformat()
                except AttributeError:
                    data["timestamp"] = str(data["timestamp"])
            prediction_list.append(data)

        if not prediction_list:
            return {
                "total_records": 0,
                "avg_prediction": 0,
                "max_prediction": 0,
                "min_prediction": 0,
                "high_usage_count": 0,
                "normal_usage_count": 0,
                "low_usage_count": 0
            }

        preds = [p.get("prediction", 0) for p in prediction_list if p.get("prediction") is not None]
        avg_pred = round(sum(preds) / len(preds), 2) if preds else 0
        max_pred = max(preds) if preds else 0
        min_pred = min(preds) if preds else 0

        high_count = sum(1 for p in preds if p >= 30)
        normal_count = sum(1 for p in preds if 15 <= p < 30)
        low_count = sum(1 for p in preds if p < 15)

        return {
            "total_records": len(prediction_list),
            "avg_prediction": avg_pred,
            "max_prediction": max_pred,
            "min_prediction": min_pred,
            "high_usage_count": high_count,
            "normal_usage_count": normal_count,
            "low_usage_count": low_count
        }
    except Exception as e:
        print(f"Analytics summary error: {e}")
        return {
            "total_records": 0,
            "avg_prediction": 0,
            "max_prediction": 0,
            "min_prediction": 0,
            "high_usage_count": 0,
            "normal_usage_count": 0,
            "low_usage_count": 0
        }

@app.get("/")
def serve_frontend():
    index_file = STATIC_DIR / "index.html"
    if index_file.exists():
        return FileResponse(index_file)
    return {"message": "AI Energy Consumption Analytics API is running"}

@app.get("/{full_path:path}")
def react_router(full_path: str):
    index_file = STATIC_DIR / "index.html"
    if index_file.exists():
        return FileResponse(index_file)
    return {"message": f"Path '{full_path}' handled by API"}
