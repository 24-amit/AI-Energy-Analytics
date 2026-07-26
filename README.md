# ⚡ AI Energy Analytics Dashboard

An AI-powered Energy Consumption Forecasting Platform built using React, FastAPI, Firebase Firestore, and XGBoost. The system predicts household energy consumption based on historical smart meter usage and weather conditions, providing real-time analytics through an interactive dashboard.

---

## 🚀 Live Demo

**Application:** https://ai-energy-analytics.onrender.com

**GitHub Repository:** https://github.com/24-amit/AI-Energy-Analytics

---

## 📌 Project Overview

Energy consumption forecasting is essential for efficient energy management and sustainability planning. This project leverages Machine Learning and Smart Meter data to predict future household energy usage.

The application allows users to:

- Enter historical energy consumption values
- Provide weather-related parameters
- Generate AI-based energy predictions
- Store prediction history in Firebase Firestore
- Visualize trends through charts and KPI dashboards

---

## ✨ Features

### 🤖 AI-Based Prediction
- XGBoost Regression Model
- Real-time energy consumption forecasting

### 📊 Interactive Dashboard
- Latest Prediction KPI
- Maximum Prediction KPI
- Average Prediction KPI
- Total Records KPI

### 📈 Energy Trend Visualization
- Dynamic energy prediction charts
- Historical trend analysis

### 📝 Prediction History
- Stores prediction records in Firebase Firestore
- Displays recent prediction history

### ☁️ Cloud Deployment
- Backend deployed on Render
- Frontend integrated with FastAPI backend
- Firebase Firestore cloud database

---

## 🛠 Tech Stack

### Frontend
- React.js
- Bootstrap 5
- Axios
- Recharts

### Backend
- FastAPI
- Python
- Uvicorn

### Machine Learning
- XGBoost
- Pandas
- NumPy
- Scikit-Learn

### Database
- Firebase Firestore

### Deployment
- Render

---

## 📂 Dataset Information

Dataset Used:

**Smart Meters in London Dataset**

Source:
https://www.kaggle.com/datasets/jeanmidev/smart-meters-in-london

Data Sources Used:

- Daily Energy Consumption Dataset
- Weather Dataset
- Smart Meter Historical Usage Data

---

## 🔄 Data Processing Pipeline

### Data Cleaning
- Removed missing values
- Converted date columns into datetime format

### Feature Engineering

Historical Features:

- lag_1
- lag_2
- lag_3
- rolling_7

Weather Features:

- temperatureMax
- temperatureMin
- humidity
- windSpeed
- pressure

Date Features:

- year
- month
- day_of_month
- day_of_week
- week_of_year

---

## 🧠 Machine Learning Model

### Algorithm
XGBoost Regressor

### Train-Test Split
- Training Data: 70,356 records
- Testing Data: 17,590 records

---

## 📊 Model Performance

| Metric | Score |
|----------|----------|
| MAE | 2.0630 |
| RMSE | 3.4647 |
| R² Score | 0.8449 |

---

## 📸 Screenshots

### KPI Dashboard

![KPI Dashboard](frontend/public/screenshots/KPI%20Cards.png)

### Prediction Form

![Prediction Form](frontend/public/screenshots/Prediction%20Form.png)

### Prediction History

![Prediction History](frontend/public/screenshots/Prediction%20History.png)

### Energy Trend Chart

![Energy Trend Chart](frontend/public/screenshots/Energy%20Trend%20Chart.png)

---

## 📁 Project Structure

```text
AI-Energy-Analytics
│
├── backend
│   ├── app.py
│   ├── firebase_config.py
│   ├── model.pkl
│   ├── train_model.py
│   ├── services
│   ├── models
│   └── requirements.txt
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public
│   │   └── screenshots
│   │
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/24-amit/AI-Energy-Analytics.git
cd AI-Energy-Analytics
```

### 2. Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

Run Backend:

```bash
uvicorn app:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

---

### 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

## 🔥 API Endpoints

### Home

```http
GET /
```

### Health Check

```http
GET /health
```

### Predict Energy Consumption

```http
POST /predict
```

### Get Prediction History

```http
GET /predictions
```

---

## 🎯 Future Enhancements

- User Authentication
- Energy Saving Recommendations
- Advanced Forecasting Models
- Monthly and Yearly Forecast Reports
- Export Predictions to CSV/PDF
- Real-Time Smart Meter Integration

---

## 👨‍💻 Author

**Amit**

GitHub:
https://github.com/24-amit

---

## 📄 License

This project is developed for educational, academic, and internship purposes.
