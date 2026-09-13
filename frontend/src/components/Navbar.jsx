import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
          <span className="bg-warning text-dark rounded-circle p-2 me-2 d-inline-flex align-items-center justify-content-center" style={{ width: "36px", height: "36px" }}>
            ⚡
          </span>
          <span className="fs-4">AI Energy Analytics</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto gap-1 fs-6 fw-medium">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link px-3 rounded ${isActive ? "active bg-warning text-dark fw-bold" : ""}`} to="/">
                <i className="bi bi-house-door me-1"></i> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link px-3 rounded ${isActive ? "active bg-warning text-dark fw-bold" : ""}`} to="/dashboard">
                <i className="bi bi-speedometer2 me-1"></i> Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link px-3 rounded ${isActive ? "active bg-warning text-dark fw-bold" : ""}`} to="/predict">
                <i className="bi bi-cpu me-1"></i> Forecast Studio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link px-3 rounded ${isActive ? "active bg-warning text-dark fw-bold" : ""}`} to="/history">
                <i className="bi bi-clock-history me-1"></i> History
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link px-3 rounded ${isActive ? "active bg-warning text-dark fw-bold" : ""}`} to="/tips">
                <i className="bi bi-lightbulb me-1"></i> Saving Tips
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link px-3 rounded ${isActive ? "active bg-warning text-dark fw-bold" : ""}`} to="/reports">
                <i className="bi bi-file-earmark-pdf me-1"></i> Reports
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link px-3 rounded ${isActive ? "active bg-warning text-dark fw-bold" : ""}`} to="/about">
                <i className="bi bi-info-circle me-1"></i> About
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
