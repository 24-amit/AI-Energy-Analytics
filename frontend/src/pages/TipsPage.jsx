import { useState } from "react";

function TipsPage() {
  // Interactive Savings Estimator State
  const [acHours, setAcHours] = useState(6);
  const [tempSetting, setTempSetting] = useState(24);
  const [householdSize, setHouseholdSize] = useState(3);

  // Energy Checklist state
  const [checklist, setChecklist] = useState({
    ledBulbs: true,
    acThermostat: false,
    smartPlugs: false,
    offPeakWasher: true,
    unplugIdle: false,
  });

  const toggleCheck = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const totalCount = Object.keys(checklist).length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  // Estimation calculation
  const estimatedDailyKwh = Math.max(5, (acHours * (28 - tempSetting) * 0.8 + householdSize * 3.5)).toFixed(1);
  const estimatedMonthlyKwh = (estimatedDailyKwh * 30).toFixed(0);
  const potentialSavingsKwh = (estimatedMonthlyKwh * 0.22).toFixed(0);

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold mb-1"><i className="bi bi-lightbulb me-2 text-warning"></i> AI Energy Saving Advisor</h2>
        <p className="text-muted">Data-driven optimization strategies and personalized energy reduction recommendations.</p>
      </div>

      {/* Interactive Estimator Tool */}
      <div className="card shadow-sm border-0 mb-5 p-4 bg-light">
        <div className="card-body">
          <h4 className="fw-bold text-dark mb-3"><i className="bi bi-calculator me-2 text-primary"></i> Household Consumption Estimator & Saver</h4>
          <p className="text-muted small mb-4">Adjust your household parameters below to calculate estimated monthly consumption and potential savings.</p>

          <div className="row g-4 align-items-center">
            <div className="col-md-7">
              <div className="mb-3">
                <label className="form-label fw-semibold">Daily AC / Heater Usage: <strong className="text-primary">{acHours} Hours/Day</strong></label>
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max="24"
                  value={acHours}
                  onChange={(e) => setAcHours(Number(e.target.value))}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Thermostat Set Point: <strong className="text-primary">{tempSetting}°C</strong></label>
                <input
                  type="range"
                  className="form-range"
                  min="18"
                  max="28"
                  value={tempSetting}
                  onChange={(e) => setTempSetting(Number(e.target.value))}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Household Members: <strong className="text-primary">{householdSize} Persons</strong></label>
                <input
                  type="range"
                  className="form-range"
                  min="1"
                  max="8"
                  value={householdSize}
                  onChange={(e) => setHouseholdSize(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="col-md-5">
              <div className="card border-primary shadow-sm bg-white p-3 text-center">
                <span className="text-muted small text-uppercase fw-bold">Estimated Daily Usage</span>
                <h2 className="fw-bold text-primary display-6 mb-2">{estimatedDailyKwh} <small className="fs-6">kWh/day</small></h2>

                <hr className="my-2" />

                <div className="row g-2 mt-1 text-center">
                  <div className="col-6">
                    <span className="small text-muted d-block">Monthly Total</span>
                    <strong className="fs-5 text-dark">{estimatedMonthlyKwh} kWh</strong>
                  </div>
                  <div className="col-6">
                    <span className="small text-muted d-block">Potential Savings</span>
                    <strong className="fs-5 text-success">~{potentialSavingsKwh} kWh</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Energy Rules Grid */}
      <h4 className="fw-bold mb-3">Targeted Reduction Recommendations</h4>
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100 p-3 border-top border-warning border-4">
            <div className="card-body">
              <h5 className="fw-bold"><i className="bi bi-thermometer-sun me-2 text-warning"></i> AC Thermostat Rule</h5>
              <p className="text-muted small">
                Increasing your AC temperature setting from 20°C to 24°C reduces cooling energy consumption by up to 24% without sacrificing indoor comfort.
              </p>
              <span className="badge bg-warning-subtle text-warning-emphasis fw-bold">High Impact</span>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100 p-3 border-top border-info border-4">
            <div className="card-body">
              <h5 className="fw-bold"><i className="bi bi-clock me-2 text-info"></i> Peak Hour Shifting</h5>
              <p className="text-muted small">
                Run heavy appliances like washing machines, dishwashers, and water heaters during off-peak hours (10 PM - 6 AM) to reduce grid strain.
              </p>
              <span className="badge bg-info-subtle text-info-emphasis fw-bold">Grid Friendly</span>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100 p-3 border-top border-success border-4">
            <div className="card-body">
              <h5 className="fw-bold"><i className="bi bi-plug me-2 text-success"></i> Phantom Load Elimination</h5>
              <p className="text-muted small">
                Unplug electronics in standby mode (TVs, gaming consoles, desktop chargers). Standby loads account for 5-10% of total residential consumption.
              </p>
              <span className="badge bg-success-subtle text-success-emphasis fw-bold">Easy Saver</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Audit Checklist */}
      <div className="card shadow-sm border-0 p-4 bg-white mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0"><i className="bi bi-check2-square me-2 text-success"></i> Energy Efficiency Checklist</h5>
            <span className="badge bg-success fs-6">{completedCount} of {totalCount} Completed ({progressPct}%)</span>
          </div>

          <div className="progress mb-4" style={{ height: "10px" }}>
            <div className="progress-bar bg-success" role="progressbar" style={{ width: `${progressPct}%` }}></div>
          </div>

          <div className="list-group list-group-flush">
            <label className="list-group-item d-flex align-items-center gap-3 py-3 border-0 bg-light rounded mb-2">
              <input type="checkbox" className="form-check-input flex-shrink-0" checked={checklist.ledBulbs} onChange={() => toggleCheck("ledBulbs")} />
              <div>
                <strong className="d-block">Replaced traditional incandescent bulbs with LED lights</strong>
                <span className="small text-muted">Saves up to 80% lighting energy usage</span>
              </div>
            </label>

            <label className="list-group-item d-flex align-items-center gap-3 py-3 border-0 bg-light rounded mb-2">
              <input type="checkbox" className="form-check-input flex-shrink-0" checked={checklist.acThermostat} onChange={() => toggleCheck("acThermostat")} />
              <div>
                <strong className="d-block">Set AC thermostat to optimal 24°C - 26°C range</strong>
                <span className="small text-muted">Optimizes cooling compressor cycles</span>
              </div>
            </label>

            <label className="list-group-item d-flex align-items-center gap-3 py-3 border-0 bg-light rounded mb-2">
              <input type="checkbox" className="form-check-input flex-shrink-0" checked={checklist.smartPlugs} onChange={() => toggleCheck("smartPlugs")} />
              <div>
                <strong className="d-block">Installed smart plugs or timer switches for heavy loads</strong>
                <span className="small text-muted">Automatically cuts power during idle hours</span>
              </div>
            </label>

            <label className="list-group-item d-flex align-items-center gap-3 py-3 border-0 bg-light rounded mb-2">
              <input type="checkbox" className="form-check-input flex-shrink-0" checked={checklist.offPeakWasher} onChange={() => toggleCheck("offPeakWasher")} />
              <div>
                <strong className="d-block">Schedule washing machine & laundry during off-peak hours</strong>
                <span className="small text-muted">Helps stabilize neighborhood energy demand</span>
              </div>
            </label>

            <label className="list-group-item d-flex align-items-center gap-3 py-3 border-0 bg-light rounded">
              <input type="checkbox" className="form-check-input flex-shrink-0" checked={checklist.unplugIdle} onChange={() => toggleCheck("unplugIdle")} />
              <div>
                <strong className="d-block">Unplugged chargers and standby appliances when not in use</strong>
                <span className="small text-muted">Prevents continuous phantom power drain</span>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TipsPage;
