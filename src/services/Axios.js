import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.noroff.no/holidaze',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
