function PredictionInsight({ prediction }) {
  if (!prediction) return null;

  let status = "";
  let advice = "";

  if (prediction < 15) {
    status = "Low Consumption";
    advice = "Energy usage is efficient.";
  } else if (prediction < 30) {
    status = "Moderate Consumption";
    advice = "Usage is within normal range.";
  } else {
    status = "High Consumption";
    advice = "Consider reducing appliance usage.";
  }

  return (
    <div className="alert alert-info mt-3">
      <h5>{status}</h5>
      <p>{advice}</p>
    </div>
  );
}

export default PredictionInsight;