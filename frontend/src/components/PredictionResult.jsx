function PredictionResult({ prediction }) {
  if (!prediction) return null;

  return (
    <div className="card shadow mt-4 border-success">
      <div className="card-body text-center">
        <h5 className="text-muted">Predicted Consumption</h5>

        <h1 className="text-success">{prediction} kWh</h1>
      </div>
    </div>
  );
}

export default PredictionResult;