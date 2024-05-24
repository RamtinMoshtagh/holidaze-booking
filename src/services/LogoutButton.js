import React from 'react';
import { useAuth } from '../hooks/AuthContext'; // Adjust the path if necessary
import styled from 'styled-components';

// Styled button component
const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: 2px solid #0056b3;
    outline-offset: 2px;
  }
`;

/**
 * LogoutButton component to handle user logout.
 * @returns {JSX.Element} The Logout button.
 */
const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Button onClick={handleLogout} aria-label="Logout">
      Logout
    </Button>
  );
};

export default LogoutButton;
