import axios from "axios";

const API = axios.create({
    baseURL: "https://ai-energy-analytics.onrender.com",
});

export default API;