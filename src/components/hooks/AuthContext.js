import React, { createContext, useContext, useState, useEffect } from 'react';
import { setAuthToken, setApiKey } from '../../services/Api'; // Adjust this path to point to where your `api.js` is located
import createApiKey from '../../services/CreateApiKey'; // Ensure the correct path

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedApiKey = localStorage.getItem('apiKey');

    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setAuthToken(storedToken); // Set auth token on initial load
    }

    if (storedApiKey) {
      setApiKey(storedApiKey); // Set the API key on initial load
    } else {
      // Create and store a new API key if not present
      createApiKey().then(apiKeyData => {
        if (apiKeyData && apiKeyData.data && apiKeyData.data.key) {
          localStorage.setItem('apiKey', apiKeyData.data.key);
          setApiKey(apiKeyData.data.key);
        }
      }).catch(error => {
        console.error('Error creating API key:', error);
      });
    }

    setLoading(false);
  }, []);

  const login = async (email, password, loginFunc) => {
    setLoading(true);
    try {
      const userData = await loginFunc(email, password);
      if (userData && userData.accessToken) {
        setUser(userData.userDetails);
        setToken(userData.accessToken);
        localStorage.setItem('user', JSON.stringify(userData.userDetails));
        localStorage.setItem('token', userData.accessToken);
        setAuthToken(userData.accessToken); // Apply the token for future requests
      } else {
        throw new Error('Login failed: Invalid credentials');
      }
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('apiKey');
    setAuthToken(null); // Clear the auth token on logout
    setApiKey(null); // Clear the API key on logout
  };

  const updateUserAvatar = (avatarUrl) => {
    setUser((prevUser) => ({
      ...prevUser,
      avatar: {
        ...prevUser.avatar,
        url: avatarUrl
      }
    }));
    localStorage.setItem('user', JSON.stringify({ ...user, avatar: { ...user.avatar, url: avatarUrl } }));
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    login,
    logout,
    loading,
    updateUserAvatar
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
