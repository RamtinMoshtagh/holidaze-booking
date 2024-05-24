import axios from 'axios';

const BASE_URL = 'https://v2.api.noroff.dev';
const API_KEY = localStorage.getItem('apiKey') || '';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Noroff-API-Key': API_KEY,
  }
});

/**
 * Sets the authorization token for API requests.
 * @param {string} token - The authorization token.
 */
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

/**
 * Sets the API key for API requests.
 * @param {string} key - The API key.
 */
export const setApiKey = (key) => {
  if (key) {
    api.defaults.headers.common['X-Noroff-API-Key'] = key;
  } else {
    delete api.defaults.headers.common['X-Noroff-API-Key'];
  }
};

// Intercept requests and log them
api.interceptors.request.use(request => {
  console.log('Starting Request', request);
  return request;
});

// Intercept responses and log them
api.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
}, error => {
  console.error('Error:', error.response ? error.response.data : error.message);
  if (error.response) {
    console.error('Detailed error response:', {
      status: error.response.status,
      headers: error.response.headers,
      data: error.response.data
    });
  }
  return Promise.reject(error);
});

export default api;
