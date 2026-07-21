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
        <div className="card shadow">
          <div className="card-body text-center">
            <h6>Latest Prediction</h6>

            <h3>{latestPrediction} kWh</h3>
          </div>
        </div>
      </div>

      <div className="col-md-3 mb-3">
        <div className="card shadow">
          <div className="card-body text-center">
            <h6>Maximum Prediction</h6>

            <h3>{maxPrediction} kWh</h3>
          </div>
        </div>
      </div>

      <div className="col-md-3 mb-3">
        <div className="card shadow">
          <div className="card-body text-center">
            <h6>Average Prediction</h6>

            <h3>{avgPrediction} kWh</h3>
          </div>
        </div>
      </div>

      <div className="col-md-3 mb-3">
        <div className="card shadow">
          <div className="card-body text-center">
            <h6>Total Records</h6>

            <h3>{predictions.length}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;