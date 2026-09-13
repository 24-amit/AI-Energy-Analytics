import { useState, useEffect } from "react";
import API from "../services/api";
import { jsPDF } from "jspdf";

function ReportsPage() {
  const [predictions, setPredictions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  useEffect(() => {
    fetchReportData();
  }, []);

  async function fetchReportData() {
    setLoading(true);
    try {
      const [predRes, sumRes] = await Promise.all([
        API.get("/predictions?limit=20"),
        API.get("/analytics/summary"),
      ]);
      setPredictions(predRes.data || []);
      setSummary(sumRes.data || null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function generatePDF() {
    setGeneratingPdf(true);
    try {
      const doc = new jsPDF();
      const today = new Date().toLocaleDateString();

      // Header
      doc.setFillColor(30, 60, 114);
      doc.rect(0, 0, 210, 40, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("AI ENERGY ANALYTICS SYSTEM", 14, 20);

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text("Energy Consumption Audit & Forecasting Report", 14, 28);
      doc.text(`Generated Date: ${today}`, 140, 28);

      // Section: Executive Summary
      doc.setTextColor(30, 60, 114);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("1. Executive Summary", 14, 52);

      doc.setTextColor(50, 50, 50);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(
        `This audit report summarizes energy consumption forecasting metrics computed using XGBoost Regressor`,
        14,
        60
      );
      doc.text(
        `trained on the London Smart Meter dataset and stored in Firebase Firestore.`,
        14,
        66
      );

      // Stat Cards Box in PDF
      if (summary) {
        doc.setFillColor(245, 247, 250);
        doc.rect(14, 75, 182, 35, "F");

        doc.setFont("helvetica", "bold");
        doc.text(`Total Records: ${summary.total_records}`, 20, 85);
        doc.text(`Average Prediction: ${summary.avg_prediction} kWh`, 20, 95);
        doc.text(`Maximum Consumption: ${summary.max_prediction} kWh`, 105, 85);
        doc.text(`Efficient Logs (<15 kWh): ${summary.low_usage_count}`, 105, 95);
      }

      // Section: Recent Logs Table
      doc.setTextColor(30, 60, 114);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("2. Recent Prediction Telemetry Logs", 14, 122);

      doc.setFillColor(40, 40, 40);
      doc.rect(14, 128, 182, 8, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("Timestamp", 18, 133);
      doc.text("Predicted (kWh)", 75, 133);
      doc.text("Max Temp (°C)", 120, 133);
      doc.text("Humidity (%)", 160, 133);

      let yPos = 143;
      doc.setTextColor(60, 60, 60);
      doc.setFont("helvetica", "normal");

      predictions.slice(0, 12).forEach((item, index) => {
        const timeStr = item.timestamp
          ? new Date(item.timestamp).toLocaleString().slice(0, 18)
          : "N/A";
        const predStr = `${item.prediction || 0} kWh`;
        const tempStr = item.temperatureMax != null ? `${item.temperatureMax} °C` : "-";
        const humStr = item.humidity != null ? `${item.humidity}%` : "-";

        if (index % 2 === 0) {
          doc.setFillColor(250, 250, 250);
          doc.rect(14, yPos - 5, 182, 7, "F");
        }

        doc.text(timeStr, 18, yPos);
        doc.text(predStr, 75, yPos);
        doc.text(tempStr, 120, yPos);
        doc.text(humStr, 160, yPos);
        yPos += 8;
      });

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("AI Energy Analytics System — Consumption Audit Document", 14, 285);

      doc.save(`AI_Energy_Analytics_Report_${today.replace(/\//g, "-")}.pdf`);
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Failed to generate PDF. Check browser permissions.");
    } finally {
      setGeneratingPdf(false);
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <h2 className="fw-bold mb-1">
            <i className="bi bi-file-earmark-pdf me-2 text-danger"></i> Reports & Energy Audit Generator
          </h2>
          <p className="text-muted mb-0">Generate, view, and export official PDF & CSV consumption audit reports.</p>
        </div>
        <button
          onClick={generatePDF}
          disabled={generatingPdf || loading}
          className="btn btn-danger btn-lg fw-bold shadow-sm"
        >
          {generatingPdf ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Generating PDF...
            </>
          ) : (
            <>
              <i className="bi bi-download me-2"></i> Download Official PDF Report
            </>
          )}
        </button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Loading audit telemetry data...</p>
        </div>
      ) : (
        <>
          {/* Report Preview Document Card */}
          <div className="card shadow-lg border-0 mb-4 p-4 bg-white">
            <div className="card-body">
              <div className="border-bottom pb-3 mb-4 d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="fw-bold text-primary mb-0">⚡ AI Energy Analytics Audit Report</h3>
                  <span className="text-muted small">Generated on {new Date().toLocaleDateString()}</span>
                </div>
                <span className="badge bg-success px-3 py-2 fs-6">Verified System Telemetry</span>
              </div>

              {/* Summary Highlights */}
              {summary && (
                <div className="row g-3 mb-4 text-center">
                  <div className="col-md-3">
                    <div className="p-3 bg-light rounded border">
                      <span className="small text-muted d-block text-uppercase">Total Predictions</span>
                      <strong className="fs-4 text-primary">{summary.total_records}</strong>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="p-3 bg-light rounded border">
                      <span className="small text-muted d-block text-uppercase">Average Usage</span>
                      <strong className="fs-4 text-dark">{summary.avg_prediction} kWh</strong>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="p-3 bg-light rounded border">
                      <span className="small text-muted d-block text-uppercase">Peak Usage Recorded</span>
                      <strong className="fs-4 text-danger">{summary.max_prediction} kWh</strong>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="p-3 bg-light rounded border">
                      <span className="small text-muted d-block text-uppercase">Efficient Cycles</span>
                      <strong className="fs-4 text-success">{summary.low_usage_count} Logs</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Preview Table */}
              <h5 className="fw-bold mb-3">Audit Log Preview (Top 10 Document Records)</h5>
              <div className="table-responsive border rounded">
                <table className="table table-striped mb-0 small">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Timestamp</th>
                      <th>Predicted Energy (kWh)</th>
                      <th>Max Temp (°C)</th>
                      <th>Humidity (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {predictions.slice(0, 10).map((item, idx) => (
                      <tr key={item.id || idx}>
                        <td>{idx + 1}</td>
                        <td>{item.timestamp ? new Date(item.timestamp).toLocaleString() : "-"}</td>
                        <td><strong>{item.prediction} kWh</strong></td>
                        <td>{item.temperatureMax != null ? `${item.temperatureMax} °C` : "-"}</td>
                        <td>{item.humidity != null ? `${item.humidity}%` : "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ReportsPage;
