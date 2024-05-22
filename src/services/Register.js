import api from './Api';

const registerUser = async (userData) => {
  try {
    console.log('Sending registration request with data:', userData); // Debugging log
    const response = await api.post('/auth/register', userData);
    if (response.status === 201) {
      console.log('Registration response:', response.data); // Debugging log
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
