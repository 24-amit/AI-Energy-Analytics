import PredictionForm from "../components/PredictionForm";

function PredictionPage() {
  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold mb-1"><i className="bi bi-cpu me-2 text-primary"></i> Energy Forecast Studio</h2>
        <p className="text-muted">Enter smart meter lag readings and outdoor meteorological parameters to execute XGBoost machine learning predictions.</p>
      </div>

      <PredictionForm />

      <div className="card shadow-sm border-0 mt-5 p-4 bg-light">
        <h5 className="fw-bold mb-3"><i className="bi bi-info-circle me-2 text-info"></i> How XGBoost Energy Forecasting Works</h5>
        <div className="row g-3 small text-muted">
          <div className="col-md-4">
            <strong className="text-dark d-block mb-1">1. Temporal Lags (Lag 1-3)</strong>
            Captures household energy momentum over recent days to establish baseline consumption velocity.
          </div>
          <div className="col-md-4">
            <strong className="text-dark d-block mb-1">2. 7-Day Rolling Moving Avg</strong>
            Smooths out daily spikes to capture underlying weekly consumption trends.
          </div>
          <div className="col-md-4">
            <strong className="text-dark d-block mb-1">3. Meteorological Inputs</strong>
            Temperature extremes, humidity, pressure, and wind speed account for HVAC heating & cooling thermal load.
          </div>
        </div>
      </div>
    </div>
  );
}

export default PredictionPage;
