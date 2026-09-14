function AboutPage() {
  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold mb-1"><i className="bi bi-info-circle me-2 text-primary"></i> About AI Energy Analytics</h2>
        <p className="text-muted">Comprehensive technical, dataset, and machine learning architecture specifications.</p>
      </div>

      {/* Overview Card */}
      <div className="card shadow-sm border-0 mb-4 p-4 bg-light">
        <div className="card-body">
          <h4 className="fw-bold text-dark mb-3">Project Objective & Motivation</h4>
          <p className="lead text-muted fs-6 mb-0">
            Rapid urbanization and climate variability make household energy consumption highly dynamic. The objective of this project is to develop an end-to-end Machine Learning web platform that utilizes smart meter reading history and meteorological parameters to accurately forecast next-day energy consumption, empowering households to optimize usage and save costs.
          </p>
        </div>
      </div>

      {/* Dataset & ML Specifications */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 h-100 p-4">
            <div className="card-body">
              <h4 className="fw-bold text-primary mb-3"><i className="bi bi-database me-2"></i> London Smart Meter Dataset</h4>
              <ul className="list-unstyled d-flex flex-column gap-2 small text-muted mb-0">
                <li><strong className="text-dark">Dataset Origin:</strong> Kaggle / UK Power Networks</li>
                <li><strong className="text-dark">Data Granularity:</strong> Half-hourly smart meter readings combined into daily kWh aggregations</li>
                <li><strong className="text-dark">Weather Telemetry:</strong> Daily Max/Min Temperature, Humidity, Wind Speed, Atmospheric Pressure</li>
                <li><strong className="text-dark">Feature Engineering:</strong> Lag 1, Lag 2, Lag 3, 7-day Rolling Moving Average, Calendar features (Day of week, Week of year, Month)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm border-0 h-100 p-4">
            <div className="card-body">
              <h4 className="fw-bold text-success mb-3"><i className="bi bi-cpu me-2"></i> XGBoost ML Architecture</h4>
              <ul className="list-unstyled d-flex flex-column gap-2 small text-muted mb-0">
                <li><strong className="text-dark">Algorithm:</strong> Extreme Gradient Boosting (`XGBRegressor`)</li>
                <li><strong className="text-dark">Hyperparameters:</strong> `n_estimators=300`, `learning_rate=0.05`, `max_depth=6`</li>
                <li><strong className="text-dark">Serialization:</strong> Joblib binary model (`model.pkl`)</li>
                <li><strong className="text-dark">Inference Latency:</strong> Sub-50ms execution via FastAPI asynchronous REST endpoint</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Matrix */}
      <div className="card shadow-sm border-0 mb-4 p-4">
        <div className="card-body">
          <h4 className="fw-bold mb-4"><i className="bi bi-layers me-2 text-warning"></i> Full System Architecture & Tech Stack</h4>

          <div className="row g-4 text-center">
            <div className="col-md-3">
              <div className="p-3 bg-light rounded border h-100">
                <i className="bi bi-code-slash fs-2 text-primary d-block mb-2"></i>
                <h6 className="fw-bold">Frontend</h6>
                <span className="small text-muted">React.js, Vite, React Router 7, Bootstrap 5, Chart.js, jsPDF</span>
              </div>
            </div>

            <div className="col-md-3">
              <div className="p-3 bg-light rounded border h-100">
                <i className="bi bi-server fs-2 text-success d-block mb-2"></i>
                <h6 className="fw-bold">Backend API</h6>
                <span className="small text-muted">Python 3.11+, FastAPI, Uvicorn, Pandas, NumPy, Scikit-learn</span>
              </div>
            </div>

            <div className="col-md-3">
              <div className="p-3 bg-light rounded border h-100">
                <i className="bi bi-fire fs-2 text-danger d-block mb-2"></i>
                <h6 className="fw-bold">Database</h6>
                <span className="small text-muted">Google Firebase Cloud Firestore (NoSQL Document Store)</span>
              </div>
            </div>

            <div className="col-md-3">
              <div className="p-3 bg-light rounded border h-100">
                <i className="bi bi-cloud-upload fs-2 text-info d-block mb-2"></i>
                <h6 className="fw-bold">Deployment</h6>
                <span className="small text-muted">Render Web Services & Static Frontend Hosting</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Author Info */}
      <div className="card shadow-sm border-0 p-4 bg-dark text-white mb-4">
        <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div>
            <span className="badge bg-warning text-dark mb-2 fw-bold">AI Energy Analytics Platform</span>
            <h4 className="fw-bold mb-1 text-white">Developer: Amit</h4>
            <p className="mb-0 small text-light opacity-75">Full Stack & AI Developer</p>
          </div>
          <div className="d-flex gap-2">
            <a href="https://github.com/24-amit" target="_blank" rel="noreferrer" className="btn btn-outline-light">
              <i className="bi bi-github me-1"></i> GitHub
            </a>
            <a href="https://www.linkedin.com/in/24amit/" target="_blank" rel="noreferrer" className="btn btn-outline-light">
              <i className="bi bi-linkedin me-1"></i> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
