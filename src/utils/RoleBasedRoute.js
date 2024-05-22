import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/hooks/AuthContext';

const RoleBasedRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole === 'venueManager' && !user.venueManager) {
    return <Navigate to="/profile" />;
  }

  return children;
};

export default RoleBasedRoute;
