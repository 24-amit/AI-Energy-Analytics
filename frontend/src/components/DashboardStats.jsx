function DashboardStats({ predictions }) {
  if (!predictions.length) return null;

  const values = predictions.map((item) => item.prediction);

  const latestPrediction = values[0];

  const maxPrediction = Math.max(...values);

  const avgPrediction = (
    values.reduce((a, b) => a + b, 0) / values.length
  ).toFixed(2);

  return (
    <div className="row mb-4">
      <div className="col-md-3 mb-3">
        <div className="card shadow border-0 h-100">
          <div className="card-body text-center">
            <h6 className="text-muted">Latest Prediction</h6>

            <h3 className="display-6 fw-bold text-primary">
              {latestPrediction} kWh
            </h3>
          </div>
        </div>
      </div>

      <div className="col-md-3 mb-3">
        <div className="card shadow border-0 h-100">
          <div className="card-body text-center">
            <h6 className="text-muted">Maximum Prediction</h6>

            <h3 className="display-6 fw-bold text-danger">
              {maxPrediction} kWh
            </h3>
          </div>
        </div>
      </div>

      <div className="col-md-3 mb-3">
        <div className="card shadow border-0 h-100">
          <div className="card-body text-center">
            <h6 className="text-muted">Average Prediction</h6>

            <h3 className="display-6 fw-bold text-success">
              {avgPrediction} kWh
            </h3>
          </div>
        </div>
      </div>

      <div className="col-md-3 mb-3">
        <div className="card shadow border-0 h-100">
          <div className="card-body text-center">
            <h6 className="text-muted">Total Records</h6>

            <h3 className="display-6 fw-bold text-dark">
              {predictions.length}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;