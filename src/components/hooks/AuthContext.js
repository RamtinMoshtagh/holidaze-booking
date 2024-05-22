import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken, setApiKey } from '../../services/Api'; // Adjust this path as needed
import createApiKey from '../../services/CreateApiKey'; // Adjust this path as needed

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiKeyReady, setApiKeyReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const storedApiKey = localStorage.getItem('apiKey');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setAuthToken(storedToken); // Set auth token on initial load
    }

    if (storedApiKey) {
      setApiKey(storedApiKey); // Set the API key on initial load
      setApiKeyReady(true);
    } else {
      createAndStoreApiKey();
    }

    setLoading(false);
  }, []);

  const createAndStoreApiKey = async () => {
    try {
      const apiKeyData = await createApiKey();
      if (apiKeyData?.data?.key) {
        localStorage.setItem('apiKey', apiKeyData.data.key);
        setApiKey(apiKeyData.data.key);
        setApiKeyReady(true); // Mark API key as ready
      }
    } catch (error) {
      console.error('Error creating API key:', error);
    }
  };

  const login = async (email, password, loginFunc) => {
    setLoading(true);
    try {
      const userData = await loginFunc(email, password);
      if (userData && userData.accessToken) {
        const { name, email, avatar, banner, venueManager } = userData.userDetails;
        const userDetails = { name, email, avatar, banner, venueManager };
        console.log('Login successful:', userDetails); // Debugging log
        setUser(userDetails);
        setToken(userData.accessToken);
        localStorage.setItem('user', JSON.stringify(userDetails));
        localStorage.setItem('token', userData.accessToken);
        setAuthToken(userData.accessToken); // Apply the token for future requests

        // Ensure API key is set
        const storedApiKey = localStorage.getItem('apiKey');
        if (!storedApiKey) {
          await createAndStoreApiKey();
        } else {
          setApiKeyReady(true); // Mark API key as ready if already stored
        }

        // Debugging log for role-based redirection
        if (venueManager) {
          console.log('Redirecting to Admin');
          navigate('/admin');
        } else {
          console.log('Redirecting to Profile');
          navigate('/profile');
        }
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
    navigate('/login'); // Redirect to login page after logout
  };

  const updateUserAvatar = (avatarUrl) => {
    const updatedUser = { ...user, avatar: { ...user.avatar, url: avatarUrl } };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    login,
    logout,
    loading,
    updateUserAvatar,
    apiKeyReady // Expose API key readiness state
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
