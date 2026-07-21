import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function EnergyChart({ predictions }) {
  if (!predictions.length) return null;

  const chartData = {
    labels: predictions
      .slice()
      .reverse()
      .map((_, index) => index + 1),

    datasets: [
      {
        label: "Energy Consumption (kWh)",

        data: predictions
          .slice()
          .reverse()
          .map((item) => item.prediction),

        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "top",
      },

      title: {
        display: true,
        text: "Energy Consumption Trend",
      },
    },
  };

  return (
    <div className="card shadow mt-4">
      <div className="card-body">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}

export default EnergyChart;