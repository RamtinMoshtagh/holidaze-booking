import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/AuthContext';

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavLinksContainer = styled.div`
  display: ${props => (props.$show ? 'flex' : 'none')};
  flex-direction: column;
  background: rgba(0, 0, 0, 0.9);
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  transition: all 0.3s ease-in-out;
  z-index: 10;

  @media (min-width: 769px) {
    display: flex;
    flex-direction: row;
    position: static;
    background: none;
    top: auto;
    margin-left: auto;
  }
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 1em;
  display: block;
  width: 100%;

  &:hover, &:focus {
    background-color: rgba(255, 255, 255, 0.2);
    color: #fff;
  }

  @media (min-width: 769px) {
    color: #007bff;
    padding: 0.5em 1em;
    width: auto;

    &:hover, &:focus {
      background-color: #f8f9fa;
      color: #0056b3;
    }
  }
`;

const LogoutLink = styled.button`
  background: none;
  border: none;
  padding: 1em;
  color: #fff;
  cursor: pointer;
  text-align: left;

  &:hover {
    color: #d4d4d4;
  }

  @media (min-width: 769px) {
    padding: 0.5em 1em;
    text-align: center;
    color: #007bff;

    &:hover {
      color: #0056b3;
    }
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
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

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
            {user?.venueManager && <NavLink to="/admin" onClick={() => setIsMenuOpen(false)}>Admin</NavLink>}
            <NavLink to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</NavLink>
            <LogoutLink onClick={handleLogout}>Logout</LogoutLink>
          </>
        ) : (
          <>
            {location.pathname !== '/login' && <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Login</NavLink>}
            {location.pathname !== '/register' && <NavLink to="/register" onClick={() => setIsMenuOpen(false)}>Register</NavLink>}
          </>
        )}
      </NavLinksContainer>
    </Nav>
  );
};

export default Navigation;
