import React from 'react';
import api from './Api';

/**
 * Function to log in a user.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<object>} The response data containing the access token and user details.
 * @throws Will throw an error if login fails.
 */
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password
    }, {
      params: {
        _holidaze: true
      }
    });

    if (response.status === 200 && response.data) {
      console.log('Login response data:', response.data); // Debugging log
      const { accessToken, name, email: userEmail, avatar, banner, venueManager } = response.data.data || {};

      return {
        accessToken,
        userDetails: {
          name,
          email: userEmail,
          avatar,
          banner,
          venueManager: venueManager || false
        }
      };
    } else {
      throw new Error('Login successful but no access token received.');
    }
  } catch (error) {
    console.error("Login failed:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export default login;
