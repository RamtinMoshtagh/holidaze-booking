import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/hooks/AuthContext'; // Ensure path correctness

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
