import { useState } from "react";
import API from "../services/api";
import PredictionResult from "./PredictionResult";

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
      
      <form onSubmit={handleSubmit}>
        <div className="row g-4 mt-3">
          {Object.keys(formData).map((field) => (
            <div className="col-md-3" key={field}>
              <label className="form-label">{field}</label>

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

        <button className="btn btn-primary mt-4" type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      <PredictionResult prediction={prediction} />
    </>
  );
}

export default PredictionForm;
