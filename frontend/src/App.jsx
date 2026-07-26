import { useState } from "react";

import PredictionForm from "./components/PredictionForm";
import PredictionHistory from "./components/PredictionHistory";
import DashboardStats from "./components/DashboardStats";
import EnergyChart from "./components/EnergyChart";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [predictions, setPredictions] = useState([]);

  function handlePredictionSuccess() {
    setRefreshTrigger((prev) => prev + 1);
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-2">⚡ AI Energy Analytics Dashboard</h1>

      <p className="text-center text-muted mb-5">
        Smart Meter Energy Consumption Forecasting using AI
      </p>

      <DashboardStats predictions={predictions} />

      <EnergyChart predictions={predictions} />

      <PredictionForm onPredictionSuccess={handlePredictionSuccess} />

      <PredictionHistory
        refreshTrigger={refreshTrigger}
        onDataLoaded={setPredictions}
      />
    </div>
  );
}

export default App;
