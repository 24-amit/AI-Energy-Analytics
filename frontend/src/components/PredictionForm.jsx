import { useState } from "react";
import API from "../services/api";
import PredictionResult from "./PredictionResult";
import PredictionInsight from "./PredictionInsight";

function PredictionForm({ onPredictionSuccess }) {
  const [formData, setFormData] = useState({
    lag_1: "",
    lag_2: "",
    lag_3: "",
    rolling_7: "",

    temperatureMax: "",
    temperatureMin: "",

    humidity: "",
    windSpeed: "",
    pressure: "",

    year: "",
    month: "",
    day_of_month: "",
    day_of_week: "",
    week_of_year: "",
  });

  const fieldLabels = {
    lag_1: "Yesterday's Energy Usage (kWh)",
    lag_2: "Energy Usage 2 Days Ago (kWh)",
    lag_3: "Energy Usage 3 Days Ago (kWh)",
    rolling_7: "Average Usage Last 7 Days (kWh)",

    temperatureMax: "Maximum Temperature (°C)",
    temperatureMin: "Minimum Temperature (°C)",

    humidity: "Humidity Level (%)",
    windSpeed: "Wind Speed (km/h)",
    pressure: "Atmospheric Pressure (hPa)",

    year: "Year",
    month: "Month",
    day_of_month: "Day of Month",
    day_of_week: "Day of Week",
    week_of_year: "Week Number",
  };

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: Number(event.target.value),
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await API.post("/predict", formData);

      setPrediction(response.data.prediction);

      setMessage("Prediction completed successfully.");

      onPredictionSuccess();
    } catch (error) {
      console.error(error);

      setMessage("Prediction failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {message && (
        <div
          className={`alert ${
            message.includes("failed") ? "alert-danger" : "alert-success"
          }`}
        >
          {message}
        </div>
      )}

      <div className="card shadow border-0 p-4">
        <h4 className="mb-3">Energy Consumption Prediction</h4>

        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            {Object.keys(formData).map((field) => (
              <div className="col-md-3" key={field}>
                <label className="form-label fw-semibold">{fieldLabels[field]}</label>

                <input
                  className="form-control"
                  type="number"
                  step="any"
                  name={field}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
          </div>

          <button
            className="btn btn-success btn-lg mt-4"
            type="submit"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>
      </div>

      <PredictionResult prediction={prediction} />

      <PredictionInsight prediction={prediction} />
    </>
  );
}

export default PredictionForm;
