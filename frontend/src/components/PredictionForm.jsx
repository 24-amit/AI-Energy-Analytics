import { useState } from "react";
import API from "../services/api";
import PredictionResult from "./PredictionResult";
import PredictionInsight from "./PredictionInsight";

function PredictionForm({ onPredictionSuccess }) {
  const [formData, setFormData] = useState({
    lag_1: 14.5,
    lag_2: 15.2,
    lag_3: 13.8,
    rolling_7: 14.6,
    temperatureMax: 28.5,
    temperatureMin: 18.2,
    humidity: 65,
    windSpeed: 12.4,
    pressure: 1013,
    year: 2024,
    month: 7,
    day_of_month: 15,
    day_of_week: 2,
    week_of_year: 29,
  });

  const fieldLabels = {
    lag_1: "Yesterday's Usage (kWh)",
    lag_2: "2 Days Ago Usage (kWh)",
    lag_3: "3 Days Ago Usage (kWh)",
    rolling_7: "7-Day Avg Usage (kWh)",
    temperatureMax: "Max Temp (°C)",
    temperatureMin: "Min Temp (°C)",
    humidity: "Humidity (%)",
    windSpeed: "Wind Speed (km/h)",
    pressure: "Pressure (hPa)",
    year: "Year",
    month: "Month",
    day_of_month: "Day of Month",
    day_of_week: "Day of Week (0-6)",
    week_of_year: "Week Number",
  };

  const presets = {
    summerHot: {
      lag_1: 28.4,
      lag_2: 29.1,
      lag_3: 26.5,
      rolling_7: 27.8,
      temperatureMax: 35.0,
      temperatureMin: 24.5,
      humidity: 78,
      windSpeed: 8.5,
      pressure: 1008,
      year: 2024,
      month: 7,
      day_of_month: 20,
      day_of_week: 6,
      week_of_year: 29,
    },
    winterCold: {
      lag_1: 32.1,
      lag_2: 34.0,
      lag_3: 31.5,
      rolling_7: 33.2,
      temperatureMax: 6.5,
      temperatureMin: -1.2,
      humidity: 85,
      windSpeed: 22.0,
      pressure: 1020,
      year: 2024,
      month: 1,
      day_of_month: 15,
      day_of_week: 1,
      week_of_year: 3,
    },
    moderateSpring: {
      lag_1: 12.3,
      lag_2: 11.8,
      lag_3: 12.5,
      rolling_7: 12.1,
      temperatureMax: 20.0,
      temperatureMin: 11.5,
      humidity: 55,
      windSpeed: 10.2,
      pressure: 1015,
      year: 2024,
      month: 4,
      day_of_month: 10,
      day_of_week: 3,
      week_of_year: 15,
    },
  };

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value === "" ? "" : Number(event.target.value),
    });
  }

  function applyPreset(presetKey) {
    if (presets[presetKey]) {
      setFormData(presets[presetKey]);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await API.post("/predict", formData);
      setPrediction(response.data.prediction);
      setMessage("Prediction calculated successfully using XGBoost Regressor.");

      if (onPredictionSuccess) {
        onPredictionSuccess();
      }
    } catch (error) {
      console.error(error);
      setMessage("Prediction failed. Please ensure backend is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center py-3">
          <h5 className="mb-0 fw-bold"><i className="bi bi-sliders me-2"></i> XGBoost Prediction Input Parameters</h5>
          <span className="badge bg-light text-primary fs-7">London Smart Meter Dataset Model</span>
        </div>

        <div className="card-body p-4">
          <div className="alert alert-info d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
            <div>
              <i className="bi bi-magic me-2"></i>
              <strong>Quick Demo Presets:</strong> Click a preset below to auto-populate sample weather and historical data.
            </div>
            <div className="btn-group btn-group-sm">
              <button type="button" className="btn btn-outline-danger" onClick={() => applyPreset("summerHot")}>
                🌞 Hot Summer Day
              </button>
              <button type="button" className="btn btn-outline-primary" onClick={() => applyPreset("winterCold")}>
                ❄️ Cold Winter Day
              </button>
              <button type="button" className="btn btn-outline-success" onClick={() => applyPreset("moderateSpring")}>
                🍃 Moderate Day
              </button>
            </div>
          </div>

          {message && (
            <div className={`alert ${message.includes("failed") ? "alert-danger" : "alert-success"} mb-4`}>
              <i className={`bi ${message.includes("failed") ? "bi-exclamation-triangle" : "bi-check-circle"} me-2`}></i>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {Object.keys(formData).map((field) => (
                <div className="col-md-3" key={field}>
                  <label className="form-label small fw-semibold text-dark">{fieldLabels[field] || field}</label>
                  <input
                    className="form-control form-control-sm"
                    type="number"
                    step="any"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                  />
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button className="btn btn-success btn-lg px-4 fw-bold shadow-sm" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Evaluating XGBoost Model...
                  </>
                ) : (
                  <>
                    <i className="bi bi-cpu me-2"></i> Generate Forecast
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <PredictionResult prediction={prediction} />
      <PredictionInsight prediction={prediction} />
    </>
  );
}

export default PredictionForm;
