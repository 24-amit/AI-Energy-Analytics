import { useEffect, useState } from "react";
import API from "../services/api";

function PredictionHistory({ refreshTrigger, onDataLoaded }) {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    fetchPredictions();
  }, [refreshTrigger]);

  async function fetchPredictions() {
    try {
      const response = await API.get("/predictions");

      setPredictions(response.data);

      onDataLoaded(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="card shadow mt-4">
      <div className="card-header bg-dark text-white">Recent Predictions</div>

      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Time</th>
                <th>Prediction</th>
                <th>Temperature</th>
                <th>Humidity</th>
              </tr>
            </thead>

            <tbody>
              {predictions.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.timestamp
                      ? new Date(item.timestamp).toLocaleString()
                      : "-"}
                  </td>

                  <td>{item.prediction} kWh</td>

                  <td>{item.temperatureMax} °C</td>

                  <td>{item.humidity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PredictionHistory;
