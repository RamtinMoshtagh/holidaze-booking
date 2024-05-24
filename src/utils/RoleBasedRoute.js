import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/hooks/AuthContext';

/**
 * A higher-order component for protecting routes based on user roles.
 * @param {object} props - The component props.
 * @param {JSX.Element} props.children - The child components to render if authorized.
 * @param {string} props.requiredRole - The required role to access the route.
 * @returns {JSX.Element} The role-based route component.
 */
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
