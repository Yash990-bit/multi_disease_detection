import axios from 'axios';

// Brute-force: Hardcode the Render URL directly
const API_BASE_URL = 'https://multi-disease-detection.onrender.com';

const api = axios.create({
    baseURL: API_BASE_URL
});

export default api;
