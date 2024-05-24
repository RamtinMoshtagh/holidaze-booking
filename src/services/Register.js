import api from './Api';

/**
 * Function to register a new user.
 * @param {object} userData - The user data for registration.
 * @returns {Promise<object>} The response data from the registration API.
 * @throws Will throw an error if registration fails.
 */
const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error('Registration failed');
    }
  } catch (error) {
    console.error('Registration Error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default registerUser;
