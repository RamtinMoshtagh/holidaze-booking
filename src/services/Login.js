import api from './Api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email: email,
      password: password
    });
    if (response.status === 200 && response.data) {
      const { accessToken, venueManager = false, name, email, avatar, banner } = response.data.data || {};
      return {
        accessToken,
        venueManager,  // Include venueManager in the user data
        userDetails: {
          name,
          email,
          avatar,
          banner
        }
      };
    } else {
      throw new Error('Login successful but no access token received.');
    }
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export default login;
