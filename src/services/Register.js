import api from './Api';

const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error('Registration failed');
    }
  } catch (error) {
    console.error('Registration Error:', error);
    throw error;
  }
};

export default registerUser;
