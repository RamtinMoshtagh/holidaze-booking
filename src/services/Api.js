import axios from 'axios';

const BASE_URL = 'https://v2.api.noroff.dev';
const API_KEY = 'be4ab55c-d5b0-44c3-8a11-67a7dafddd10';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Noroff-API-Key': API_KEY
  }
});

export default api;
