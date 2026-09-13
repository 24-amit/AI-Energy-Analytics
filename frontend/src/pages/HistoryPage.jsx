import { useState, useEffect } from "react";
import API from "../services/api";

function HistoryPage() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [usageFilter, setUsageFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("NEWEST");

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    setLoading(true);
    try {
      const response = await API.get("/predictions?limit=100");
      setPredictions(response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  // Filter & Search Logic
  const filteredPredictions = predictions.filter((item) => {
    const matchesSearch =
      (item.timestamp && item.timestamp.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.prediction && String(item.prediction).includes(searchTerm)) ||
      (item.temperatureMax && String(item.temperatureMax).includes(searchTerm));

    if (!matchesSearch) return false;

    if (usageFilter === "HIGH") return item.prediction >= 30;
    if (usageFilter === "NORMAL") return item.prediction >= 15 && item.prediction < 30;
    if (usageFilter === "LOW") return item.prediction < 15;

    return true;
  });

  // Sort Logic
  const sortedPredictions = [...filteredPredictions].sort((a, b) => {
    if (sortBy === "NEWEST") return new Date(b.timestamp || 0) - new Date(a.timestamp || 0);
    if (sortBy === "OLDEST") return new Date(a.timestamp || 0) - new Date(b.timestamp || 0);
    if (sortBy === "HIGHEST") return b.prediction - a.prediction;
    if (sortBy === "LOWEST") return a.prediction - b.prediction;
    return 0;
  });

  function exportCSV() {
    if (!sortedPredictions.length) return;

    const escapeCsv = (val) => {
      const str = val === null || val === undefined ? "" : String(val);
      return `"${str.replace(/"/g, '""').replace(/[\r\n]+/g, " ")}"`;
    };

    const header = [
      "ID",
      "Timestamp",
      "Predicted_kWh",
      "Temp_Max_C",
      "Temp_Min_C",
      "Humidity",
      "Lag_1_kWh",
      "Rolling_7_kWh"
    ].map(escapeCsv).join(",");

    const rows = sortedPredictions.map((p, index) => {
      const docId = p.id || p._id || `REC_${index + 1}`;
      const timeStr = p.timestamp ? new Date(p.timestamp).toLocaleString() : "N/A";
      const pred = p.prediction ?? p.predicted_energy ?? 0;
      const tempMax = p.temperatureMax ?? "-";
      const tempMin = p.temperatureMin ?? "-";
      const hum = p.humidity ?? "-";
      const lag1 = p.lag_1 ?? "-";
      const roll7 = p.rolling_7 ?? "-";

      return [docId, timeStr, pred, tempMax, tempMin, hum, lag1, roll7]
        .map(escapeCsv)
        .join(",");
    });

    const csvContent = "\uFEFF" + header + "\n" + rows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `energy_predictions_history_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="fw-bold mb-1"><i className="bi bi-clock-history me-2 text-primary"></i> Historical Data Explorer</h2>
          <p className="text-muted mb-0">Browse, filter, and export historical energy predictions stored in Firestore.</p>
        </div>
        <div className="d-flex gap-2">
          <button onClick={fetchHistory} className="btn btn-outline-secondary btn-sm">
            <i className="bi bi-arrow-clockwise me-1"></i> Refresh
          </button>
          <button onClick={exportCSV} className="btn btn-success btn-sm fw-bold">
            <i className="bi bi-file-earmark-excel me-1"></i> Export CSV
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card shadow-sm border-0 mb-4 p-3 bg-light">
        <div className="row g-3">
          <div className="col-md-5">
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-white"><i className="bi bi-search"></i></span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by date, prediction, temperature..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-3">
            <select
              className="form-select form-select-sm"
              value={usageFilter}
              onChange={(e) => setUsageFilter(e.target.value)}
            >
              <option value="ALL">All Usage Levels</option>
              <option value="HIGH">High Consumption (&ge; 30 kWh)</option>
              <option value="NORMAL">Normal Consumption (15-30 kWh)</option>
              <option value="LOW">Efficient Usage (&lt; 15 kWh)</option>
            </select>
          </div>

          <div className="col-md-4">
            <select
              className="form-select form-select-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="NEWEST">Sort: Newest First</option>
              <option value="OLDEST">Sort: Oldest First</option>
              <option value="HIGHEST">Sort: Highest Consumption</option>
              <option value="LOWEST">Sort: Lowest Consumption</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3">
          <span className="fw-bold"><i className="bi bi-table me-2"></i> Firestore Document Records</span>
          <span className="badge bg-primary">{sortedPredictions.length} Records Shown</span>
        </div>

        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2 text-muted">Loading prediction history...</p>
            </div>
          ) : sortedPredictions.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <i className="bi bi-folder-x fs-1 d-block mb-2"></i>
              No prediction records match your search criteria.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Timestamp</th>
                    <th>Forecasted Usage</th>
                    <th>Usage Status</th>
                    <th>Max Temp</th>
                    <th>Min Temp</th>
                    <th>Humidity</th>
                    <th>Yesterday's Lag</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPredictions.map((item) => {
                    let badgeClass = "bg-warning text-dark";
                    let badgeLabel = "Moderate";
                    if (item.prediction >= 30) {
                      badgeClass = "bg-danger";
                      badgeLabel = "High";
                    } else if (item.prediction < 15) {
                      badgeClass = "bg-success";
                      badgeLabel = "Efficient";
                    }

                    return (
                      <tr key={item.id || item.timestamp}>
                        <td className="small font-monospace">
                          {item.timestamp ? new Date(item.timestamp).toLocaleString() : "-"}
                        </td>
                        <td>
                          <strong className="fs-6">{item.prediction}</strong> <span className="small text-muted">kWh</span>
                        </td>
                        <td>
                          <span className={`badge ${badgeClass}`}>{badgeLabel}</span>
                        </td>
                        <td>{item.temperatureMax != null ? `${item.temperatureMax} °C` : "-"}</td>
                        <td>{item.temperatureMin != null ? `${item.temperatureMin} °C` : "-"}</td>
                        <td>{item.humidity != null ? `${item.humidity}%` : "-"}</td>
                        <td>{item.lag_1 != null ? `${item.lag_1} kWh` : "-"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
