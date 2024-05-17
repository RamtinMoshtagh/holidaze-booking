import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
      }
    } catch (e) {
      console.error("Failed to load stored user data:", e);
    }
    setLoading(false);
  }, []);

  const login = async (email, password, loginFunc) => {
    setLoading(true);
    try {
      const userData = await loginFunc(email, password);
      setUser(userData.userDetails);
      setToken(userData.accessToken);
      localStorage.setItem('user', JSON.stringify(userData.userDetails));
      localStorage.setItem('token', userData.accessToken);
    } catch (error) {
      console.error('Login Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
