import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/hooks/AuthContext'; // Ensure path correctness

/**
 * A higher-order component for protecting routes that require authentication.
 * @param {object} props - The component props.
 * @param {JSX.Element} props.children - The child components to render if authenticated.
 * @returns {JSX.Element} The protected route component.
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
