# AI Energy Analytics System

An AI-powered energy consumption forecasting system built using Smart Meter data from the London Smart Meter Dataset. The application predicts future energy usage, stores prediction results, and provides interactive visualizations through a web dashboard.

## Project Overview

This project uses Machine Learning to analyze historical smart meter readings and forecast future energy consumption. The goal is to help users understand usage patterns, monitor consumption trends, and make data-driven energy optimization decisions.

## Features

* Energy consumption forecasting using XGBoost
* REST API built with FastAPI
* Firebase Firestore integration
* Interactive React dashboard
* Real-time prediction visualization
* Historical consumption analysis
* Responsive user interface
* Cloud deployment support

## Tech Stack

### Frontend

* React.js
* Axios
* Chart.js / Recharts
* CSS

### Backend

* FastAPI
* Uvicorn
* Pandas
* NumPy
* XGBoost
* Joblib

### Database

* Firebase Firestore

### Deployment

* Render

## Dataset

Dataset Used:

**Smart Meters in London Dataset**

Source:
https://www.kaggle.com/datasets/jeanmidev/smart-meters-in-london

Files used:

* Half-hourly energy consumption data
* Weather data
* Household information

## Project Structure

```text
AI-Energy-Analytics/
│
├── backend/
|   ├── data/
│   ├── app.py
│   ├── train_model.py
│   ├── firebase_config.py
│   ├── model.pkl
│   ├── requirements.txt
│   └── serviceAccountKey.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## Machine Learning Pipeline

### Data Preprocessing

* Handle missing values
* Convert timestamps to datetime format
* Generate time-based features:

  * Hour
  * Day
  * Month
  * Day of Week
* Create lag features
* Create rolling average features

### Model Training

```python
XGBRegressor(
    n_estimators=300,
    learning_rate=0.05,
    max_depth=6
)
```

### Evaluation Metrics

* MAE (Mean Absolute Error)
* RMSE (Root Mean Squared Error)
* R² Score

## Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/AI-Energy-Analytics.git
cd AI-Energy-Analytics
```

---

### Backend Setup

Create virtual environment:

```bash
python -m venv venv
```

Activate environment:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run API:

```bash
uvicorn app:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

---

### Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install packages:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

## API Endpoints

### Health Check

```http
GET /
```

Response:

```json
{
  "message": "AI Energy Analytics API Running"
}
```

### Predict Energy Consumption

```http
POST /predict
```

Example Request:

```json
{
  "lag_1": 125,
  "lag_2": 6758,
  "lag_3": 876,
  "rolling_7": 69,
  "temperatureMax": 30,
  "temperatureMin": 20,
  "humidity": 70
}
```

Example Response:

```json
{
  "predicted_energy": 152.43
}
```

## Firebase Integration

Prediction results are automatically stored in Firestore.

Example document:

```json
{
  "timestamp": "2026-07-21T10:30:00",
  "prediction": 152.43
}
```

## Deployment

### Backend (Render)

1. Push project to GitHub
2. Create a Web Service on Render
3. Connect GitHub repository
4. Add environment variables
5. Deploy

Start Command:

```bash
uvicorn app:app --host 0.0.0.0 --port $PORT
```

### Frontend (Render)

Build Command:

```bash
npm install && npm run build
```

Publish Directory:

```text
dist
```

## Future Improvements

* User authentication
* Advanced forecasting models
* Energy anomaly detection
* Personalized energy-saving recommendations
* Real-time smart meter integration
* AI-powered analytics reports

## Author

**Amit**

MCA Student

LinkedIn: https://www.linkedin.com/in/24amit/

GitHub: https://github.com/24-amit

## License

This project is licensed under the MIT License.
