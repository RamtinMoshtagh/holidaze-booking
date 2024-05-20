import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/AuthContext';

const Nav = styled.nav`
  background-color: #fff;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinksContainer = styled.div`
  display: ${props => props.$show ? 'flex' : 'none'};
  flex-direction: column;
  background: rgba(255, 255, 255, 0.95);
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  transition: all 0.3s ease-in-out;
  z-index: 10;

  @media (min-width: 769px) {
    display: flex;
    flex-direction: row;
    position: static;
    background: none;
  }
`;

const NavLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  padding: 1em;
  display: block;
  width: 100%;

  &:hover, &:focus {
    background-color: #f8f9fa;
    color: #0056b3;
  }

  @media (min-width: 769px) {
    padding: 0.5em 1em;
    width: auto;
  }
`;

const LogoutLink = styled.button`
  background: none;
  border: none;
  padding: 1em;
  color: #007bff;
  cursor: pointer;

  &:hover {
    color: #0056b3;
  }
`;

const MenuIcon = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  display: block;

  @media (min-width: 769px) {
    display: none;
  }
`;

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <Nav>
      <MenuIcon onClick={toggleMenu}>
        {isMenuOpen ? '✖' : '☰'}
      </MenuIcon>
      <NavLinksContainer $show={isMenuOpen}>
        {isAuthenticated ? (
          <>
            <NavLink to="/venues" onClick={() => setIsMenuOpen(false)}>Venues</NavLink>
            <NavLink to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</NavLink>
            <NavLink to="/admin" onClick={() => setIsMenuOpen(false)}>Admin</NavLink>
            <LogoutLink onClick={handleLogout}>Logout</LogoutLink>
          </>
        ) : (
          <>
            <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Login</NavLink>
            <NavLink to="/register" onClick={() => setIsMenuOpen(false)}>Register</NavLink>
          </>
        )}
      </NavLinksContainer>
    </Nav>
  );
};

export default Navigation;
