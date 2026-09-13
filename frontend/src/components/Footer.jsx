import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-auto border-top border-secondary">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-5">
            <h5 className="text-warning fw-bold mb-3 d-flex align-items-center">
              <span className="bg-warning text-dark rounded-circle p-1 me-2 d-inline-flex align-items-center justify-content-center" style={{ width: "28px", height: "28px", fontSize: "14px" }}>
                ⚡
              </span>
              AI Energy Analytics
            </h5>
            <p className="text-secondary small max-w-400 mb-3">
              An intelligent energy consumption forecasting platform using the London Smart Meter dataset and XGBoost Machine Learning architecture. Developed for real-time energy optimization.
            </p>
            <div className="d-flex gap-2">
              <a href="https://github.com/24-amit" target="_blank" rel="noreferrer" className="btn btn-outline-light btn-sm rounded-circle" title="GitHub">
                <i className="bi bi-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/24amit/" target="_blank" rel="noreferrer" className="btn btn-outline-light btn-sm rounded-circle" title="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          <div className="col-md-2">
            <h6 className="fw-bold text-light mb-3">Quick Navigation</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 mb-0">
              <li><Link to="/" className="text-secondary text-decoration-none hover-white">Home</Link></li>
              <li><Link to="/dashboard" className="text-secondary text-decoration-none hover-white">Dashboard</Link></li>
              <li><Link to="/predict" className="text-secondary text-decoration-none hover-white">Forecast Studio</Link></li>
              <li><Link to="/history" className="text-secondary text-decoration-none hover-white">History Logs</Link></li>
            </ul>
          </div>

          <div className="col-md-2">
            <h6 className="fw-bold text-light mb-3">Features & Tools</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 mb-0">
              <li><Link to="/tips" className="text-secondary text-decoration-none hover-white">Saving Advisor</Link></li>
              <li><Link to="/reports" className="text-secondary text-decoration-none hover-white">PDF Audit Export</Link></li>
              <li><Link to="/about" className="text-secondary text-decoration-none hover-white">Model Specs</Link></li>
            </ul>
          </div>

          <div className="col-md-3">
            <h6 className="fw-bold text-light mb-3">System Tech Stack</h6>
            <div className="d-flex flex-wrap gap-1">
              <span className="badge bg-secondary">FastAPI</span>
              <span className="badge bg-secondary">XGBoost</span>
              <span className="badge bg-secondary">React.js</span>
              <span className="badge bg-secondary">Firebase</span>
              <span className="badge bg-secondary">Chart.js</span>
              <span className="badge bg-secondary">Bootstrap 5</span>
            </div>
          </div>
        </div>

        <hr className="my-4 border-secondary opacity-50" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-secondary small">
          <p className="mb-0">© {new Date().getFullYear()} AI Energy Analytics System</p>
          <p className="mb-0">Designed & Developed by <strong className="text-warning">Amit</strong></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
