import axios from "axios";

// Default to local backend if running locally, or use VITE_API_URL if configured
const baseURL = import.meta.env.VITE_API_URL ||
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:8000"
    : "https://ai-energy-analytics.onrender.com");

const API = axios.create({
    baseURL: baseURL,
});

export default API;