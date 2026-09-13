import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      {/* Hero Banner Section */}
      <div
        className="p-5 rounded-4 mb-5 shadow text-white text-center position-relative overflow-hidden"
        style={{
          backgroundColor: "#111827",
          backgroundImage: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1e3a8a 100%)",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}
      >
        <div className="py-3 max-w-800 mx-auto position-relative z-1">
          <span className="badge bg-warning text-dark px-3 py-2 rounded-pill mb-3 fw-bold text-uppercase tracking-wider">
            ⚡ Smart Meter AI Forecasting Platform
          </span>

          <h1 className="display-4 fw-black mb-3 text-white text-drop-shadow">
            AI Energy Analytics & Forecasting System
          </h1>

          <p className="lead mb-4 text-light opacity-90 fs-5 max-w-700 mx-auto">
            Empowering households and energy managers with XGBoost Machine Learning predictions, smart meter data insights, and automated energy optimization recommendations.
          </p>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/predict" className="btn btn-warning btn-lg fw-bold px-4 py-3 shadow-lg">
              <i className="bi bi-cpu me-2"></i> Launch Prediction Model
            </Link>
            <Link to="/dashboard" className="btn btn-outline-light btn-lg fw-bold px-4 py-3">
              <i className="bi bi-speedometer2 me-2"></i> View Analytics Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="row g-4 mb-5 text-center">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 py-3 bg-white">
            <div className="card-body">
              <h2 className="fw-extrabold text-primary mb-1">XGBoost</h2>
              <p className="text-muted mb-0 small fw-semibold">ML Regressor Model</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 py-3 bg-white">
            <div className="card-body">
              <h2 className="fw-extrabold text-success mb-1">London Smart</h2>
              <p className="text-muted mb-0 small fw-semibold">Meter Dataset Source</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 py-3 bg-white">
            <div className="card-body">
              <h2 className="fw-extrabold text-info mb-1">FastAPI</h2>
              <p className="text-muted mb-0 small fw-semibold">High Performance Backend</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm h-100 py-3 bg-white">
            <div className="card-body">
              <h2 className="fw-extrabold text-warning mb-1">Firebase</h2>
              <p className="text-muted mb-0 small fw-semibold">Realtime Firestore DB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Features Grid */}
      <h3 className="fw-bold text-center mb-4 text-dark">Core System Capabilities</h3>
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100 p-3 bg-white">
            <div className="card-body">
              <div className="bg-primary text-white rounded-circle p-3 d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "50px", height: "50px" }}>
                <i className="bi bi-graph-up-arrow fs-4"></i>
              </div>
              <h5 className="fw-bold text-dark">Accurate Energy Forecasting</h5>
              <p className="text-muted small">
                Trained on historical smart meter consumption, lag indicators, and weather telemetry to forecast household energy usage.
              </p>
              <Link to="/predict" className="btn btn-sm btn-link p-0 text-decoration-none fw-bold">Try Prediction &rarr;</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100 p-3 bg-white">
            <div className="card-body">
              <div className="bg-success text-white rounded-circle p-3 d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "50px", height: "50px" }}>
                <i className="bi bi-pie-chart-fill fs-4"></i>
              </div>
              <h5 className="fw-bold text-dark">Interactive Visual Analytics</h5>
              <p className="text-muted small">
                Real-time chart visualization of energy consumption trends, peak usage metrics, and weather correlations.
              </p>
              <Link to="/dashboard" className="btn btn-sm btn-link p-0 text-decoration-none fw-bold">Open Dashboard &rarr;</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100 p-3 bg-white">
            <div className="card-body">
              <div className="bg-warning text-dark rounded-circle p-3 d-inline-flex align-items-center justify-content-center mb-3" style={{ width: "50px", height: "50px" }}>
                <i className="bi bi-lightbulb-fill fs-4"></i>
              </div>
              <h5 className="fw-bold text-dark">Smart Energy Savings</h5>
              <p className="text-muted small">
                Automated recommendations and peak-hour efficiency tips customized to outdoor temperature and usage patterns.
              </p>
              <Link to="/tips" className="btn btn-sm btn-link p-0 text-decoration-none fw-bold">Explore Saving Tips &rarr;</Link>
            </div>
          </div>
        </div>
      </div>

      {/* System Architecture Section */}
      <div className="card shadow-sm border-0 p-4 bg-white mb-5">
        <div className="card-body">
          <h4 className="fw-bold mb-4 text-dark"><i className="bi bi-diagram-3 me-2 text-primary"></i> System Workflow & Data Pipeline</h4>
          <div className="row g-3 align-items-center text-center">
            <div className="col-md-3">
              <div className="p-3 bg-light rounded shadow-sm border">
                <h6 className="fw-bold text-dark mb-1">1. Input Data</h6>
                <span className="small text-muted">Smart Meter Lags + Weather Features</span>
              </div>
            </div>
            <div className="col-md-1 d-none d-md-block fs-3 text-primary fw-bold">➔</div>
            <div className="col-md-4">
              <div className="p-3 bg-light rounded shadow-sm border">
                <h6 className="fw-bold text-dark mb-1">2. FastAPI & XGBoost</h6>
                <span className="small text-muted">Model Evaluation & Prediction Engine</span>
              </div>
            </div>
            <div className="col-md-1 d-none d-md-block fs-3 text-primary fw-bold">➔</div>
            <div className="col-md-3">
              <div className="p-3 bg-light rounded shadow-sm border">
                <h6 className="fw-bold text-dark mb-1">3. Cloud Firestore</h6>
                <span className="small text-muted">Persistence, Reports & Dashboards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
