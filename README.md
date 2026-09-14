# ⚡ AI Energy Analytics & Forecasting System

An end-to-end multi-page AI application for household energy consumption forecasting, visual analytics, and energy auditing. Built using the **London Smart Meter Dataset**, **XGBoost Machine Learning**, **FastAPI**, **Firebase Firestore**, and a multi-page **React** interface.

---

## 🚀 Live Demo & Links

- **Live Application:** [ai-energy-analytics.onrender.com](https://ai-energy-analytics.onrender.com)
- **GitHub Repository:** [github.com/24-amit/AI-Energy-Analytics](https://github.com/24-amit/AI-Energy-Analytics)

---

## 🏛 System Architecture & Capabilities

This application is structured into a multi-page AI platform with 7 distinct modules:

1. 🏠 **Home Page (`/`)**: Landing page showcasing key metrics, system capabilities, architecture flowchart, and quick navigation.
2. 📊 **Analytics Dashboard (`/dashboard`)**: Visual chart analytics (`Chart.js`), usage distribution cards (High, Normal, Low usage), and metric counters.
3. ⚡ **Forecast Studio (`/predict`)**: XGBoost prediction input form with **Quick Demo Presets** (Hot Summer Day, Cold Winter Day, Moderate Day) and instant insight feedback.
4. 📜 **Historical Data Explorer (`/history`)**: Paginated/filterable historical prediction log stored in Firestore with search, usage filters, sorting, and **CSV Data Export**.
5. 💡 **Energy Saving Advisor (`/tips`)**: Interactive household energy savings calculator, weather-based optimization rules, and energy efficiency audit checklist.
6. 📄 **Reports & PDF Generator (`/reports`)**: Automated official PDF energy audit report generation using `jsPDF` with telemetry logs and download capability.
7. ℹ️ **About & ML Specs (`/about`)**: Detailed documentation covering dataset specs, XGBoost hyperparameter details, evaluation metrics (MAE, RMSE, R²), and tech stack.

---

## 🛠️ Tech Stack

### Frontend
- **React.js (Vite)**
- **React Router 7** (`react-router-dom`)
- **Bootstrap 5 & Bootstrap Icons**
- **Chart.js & react-chartjs-2**
- **jsPDF** (Automated PDF Report Generator)
- **Axios**

### Backend
- **FastAPI** (Python 3.11+)
- **Uvicorn**
- **XGBoost** (`XGBRegressor`)
- **Pandas & NumPy**
- **Joblib**

### Database & Infrastructure
- **Google Firebase Cloud Firestore** (NoSQL Data Persistence)
- **Render** (Cloud API & Web App Deployment)

---

## 📂 Project Structure

```text
AI-Energy-Analytics/
│
├── backend/
│   ├── data/
│   ├── models/
│   │   └── prediction.py
│   ├── services/
│   │   └── predictor.py
│   ├── app.py                   # FastAPI Application & REST Endpoints
│   ├── firebase_config.py       # Firestore Connection Initialization
│   ├── train_model.py           # XGBoost Model Training Script
│   ├── model.pkl                # Serialized XGBoost Regressor
│   ├── requirements.txt
│   └── serviceAccountKey.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── DashboardStats.jsx
│   │   │   ├── EnergyChart.jsx
│   │   │   ├── PredictionForm.jsx
│   │   │   ├── PredictionInsight.jsx
│   │   │   ├── PredictionResult.jsx
│   │   │   └── PredictionHistory.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── PredictionPage.jsx
│   │   │   ├── HistoryPage.jsx
│   │   │   ├── TipsPage.jsx
│   │   │   ├── ReportsPage.jsx
│   │   │   └── AboutPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🤖 Machine Learning Pipeline

### Feature Engineering
- **Temporal Lag Features:** `lag_1` (yesterday), `lag_2` (2 days ago), `lag_3` (3 days ago)
- **Rolling Moving Averages:** `rolling_7` (7-day average usage)
- **Meteorological Parameters:** `temperatureMax`, `temperatureMin`, `humidity`, `windSpeed`, `pressure`
- **Calendar Identifiers:** `year`, `month`, `day_of_month`, `day_of_week`, `week_of_year`

### XGBoost Configuration & Model Metrics
```python
XGBRegressor(
    n_estimators=300,
    learning_rate=0.05,
    max_depth=6
)
```

| Metric | Score |
| :--- | :--- |
| **MAE** | 2.0630 |
| **RMSE** | 3.4647 |
| **R² Score** | 0.8449 |

---

## ⚡ API Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Health check & model status |
| `POST` | `/predict` | Evaluates XGBoost prediction & persists to Firestore |
| `GET` | `/predictions` | Fetches recent prediction document logs from Firestore |
| `GET` | `/analytics/summary` | Returns aggregate statistics, max/min/avg, and usage distributions |

---

## ⚙️ Local Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/24-amit/AI-Energy-Analytics.git
cd AI-Energy-Analytics
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```
Backend API will be running at `http://localhost:8000`.

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend will be running at `http://localhost:5173`.

---

## 👤 Author

**Amit**  
Full Stack & AI Developer  
🔗 **LinkedIn:** [linkedin.com/in/24amit/](https://www.linkedin.com/in/24amit/)  
🐙 **GitHub:** [github.com/24-amit](https://github.com/24-amit)

---

## 📜 License
This project is licensed under the MIT License.
