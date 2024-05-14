// src/services/login.js
import api from './Api';

const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    // Check the response status and data structure
    if (response.status === 200 && response.data && response.data.data.accessToken) {
      return response.data.data;  // Assuming that the response structure includes a nested 'data' object
    } else {
      // Log and throw an error if no access token is found
      console.error("No access token received, response data:", response.data);
      throw new Error('No access token received');
    }
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export default login;
