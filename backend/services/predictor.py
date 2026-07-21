import joblib
import pandas as pd
from pathlib import Path

# =====================================================
# Load Model
# =====================================================

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "model.pkl"

model = joblib.load(MODEL_PATH)

# =====================================================
# Prediction Function
# =====================================================

def predict_energy(data):

    input_df = pd.DataFrame([data])

    prediction = model.predict(input_df)

    return float(prediction[0])