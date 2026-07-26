function PredictionInsight({ prediction }) {
  if (!prediction) return null;

  let status = "";
  let advice = "";
  let alertType = "";

  if (prediction < 15) {
    status = "Low Consumption";
    advice =
      "Energy usage appears efficient. Current consumption is below average.";
    alertType = "success";
  } else if (prediction < 30) {
    status = "Moderate Consumption";
    advice =
      "Energy consumption is within the normal range for a household.";
    alertType = "warning";
  } else {
    status = "High Consumption";
    advice =
      "Predicted consumption is high. Consider reducing appliance usage during peak periods.";
    alertType = "danger";
  }

  return (
    <div className={`alert alert-${alertType} mt-4 shadow`}>
      <h5>{status}</h5>

      <p className="mb-0">
        <strong>Recommendation:</strong> {advice}
      </p>
    </div>
  );
}

export default PredictionInsight;