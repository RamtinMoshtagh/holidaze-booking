import axios from 'axios';

const BASE_URL = 'https://v2.api.noroff.dev';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const setApiKey = (apiKey) => {
    if (apiKey) {
        api.defaults.headers.common['X-Noroff-API-Key'] = apiKey;
    } else {
        delete api.defaults.headers.common['X-Noroff-API-Key'];
    }
};

// Intercept requests and responses to log them
api.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request, null, 2));
    return request;
});

api.interceptors.response.use(response => {
    console.log('Response:', JSON.stringify(response, null, 2));
    return response;
}, error => {
    console.error('Error:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
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
