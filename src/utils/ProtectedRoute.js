import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext'; // Ensure path correctness

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
