import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import PredictionPage from "./pages/PredictionPage";
import HistoryPage from "./pages/HistoryPage";
import TipsPage from "./pages/TipsPage";
import ReportsPage from "./pages/ReportsPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100 bg-light">
        <Navbar />

        <main className="container my-4 flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/predict" element={<PredictionPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/tips" element={<TipsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
