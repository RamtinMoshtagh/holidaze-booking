import axios from 'axios';

// Set the base URL for all API requests
const BASE_URL = 'https://v2.api.noroff.dev';

// Your actual API key
const API_KEY = 'be4ab55c-d5b0-44c3-8a11-67a7dafddd10';

// Create an axios instance with predefined configuration
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-Noroff-API-Key': API_KEY  // Include the API key in the headers for all requests
    }
});

export default api;
