import axios from 'axios';

// We now use the proxy set in vercel.json
const API_BASE_URL = '/api';

const api = axios.create({
    baseURL: API_BASE_URL
});

export default api;
