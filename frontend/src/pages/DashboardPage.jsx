import { useState, useEffect } from "react";
import API from "../services/api";
import DashboardStats from "../components/DashboardStats";
import EnergyChart from "../components/EnergyChart";
import { Link } from "react-router-dom";

function DashboardPage() {
  const [predictions, setPredictions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setLoading(true);
    try {
      const [predRes, sumRes] = await Promise.all([
        API.get("/predictions?limit=50"),
        API.get("/analytics/summary"),
      ]);
      setPredictions(predRes.data || []);
      setSummary(sumRes.data || null);
    } catch (error) {
      console.error("Dashboard data fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="fw-bold mb-1"><i className="bi bi-speedometer2 me-2 text-primary"></i> Analytics Dashboard</h2>
          <p className="text-muted mb-0">Visual analytics, usage metrics, and historical forecast distributions</p>
        </div>
        <button onClick={fetchDashboardData} className="btn btn-outline-primary btn-sm">
          <i className="bi bi-arrow-clockwise me-1"></i> Refresh Data
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading dashboard...</span>
          </div>
          <p className="mt-2 text-muted">Fetching latest energy analytics from Firestore...</p>
        </div>
      ) : (
        <>
          {/* Main Stats Cards */}
          <DashboardStats predictions={predictions} />

          {/* Usage Categories & Weather Distribution Row */}
          {summary && (
            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div className="card shadow-sm border-0 border-start border-danger border-4 h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="text-muted small text-uppercase fw-semibold">High Usage (&ge; 30 kWh)</span>
                        <h2 className="fw-bold text-danger mb-0">{summary.high_usage_count}</h2>
                      </div>
                      <div className="bg-danger-subtle text-danger p-3 rounded-circle">
                        <i className="bi bi-exclamation-triangle fs-4"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card shadow-sm border-0 border-start border-warning border-4 h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="text-muted small text-uppercase fw-semibold">Normal Usage (15-30 kWh)</span>
                        <h2 className="fw-bold text-warning mb-0">{summary.normal_usage_count}</h2>
                      </div>
                      <div className="bg-warning-subtle text-warning p-3 rounded-circle">
                        <i className="bi bi-dash-circle fs-4"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card shadow-sm border-0 border-start border-success border-4 h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="text-muted small text-uppercase fw-semibold">Efficient Usage (&lt; 15 kWh)</span>
                        <h2 className="fw-bold text-success mb-0">{summary.low_usage_count}</h2>
                      </div>
                      <div className="bg-success-subtle text-success p-3 rounded-circle">
                        <i className="bi bi-check-circle fs-4"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Forecast Trend Chart */}
          <div className="row g-4 mb-4">
            <div className="col-12">
              <EnergyChart predictions={predictions} />
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="card border-0 shadow-sm bg-primary text-white p-4">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div>
                <h4 className="fw-bold mb-1">Want to run a new prediction model evaluation?</h4>
                <p className="mb-0 text-white-50">Test with customized weather parameters and historical smart meter lags.</p>
              </div>
              <Link to="/predict" className="btn btn-warning fw-bold px-4">
                <i className="bi bi-cpu me-2"></i> Open Forecast Studio
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardPage;
