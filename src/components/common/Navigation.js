import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  z-index: 10; // Ensure it appears over other content

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
  width: 100%; // Full width links for better mobile experience
  text-align: center;

  &:hover, &:focus {
    background-color: #f8f9fa;
    color: #0056b3;
  }

  @media (min-width: 769px) {
    padding: 0.5em 1em;
    width: auto; // Auto width on desktop
  }
`;

const MenuIcon = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  display: block;

  @media (min-width: 769px) {
    display: none; // Hide button on larger screens
  }
`;

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Nav>
      <MenuIcon onClick={toggleMenu}>
        {isMenuOpen ? '✖' : '☰'}
      </MenuIcon>
      <NavLinksContainer $show={isMenuOpen}>
        <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
        <NavLink to="/venues" onClick={() => setIsMenuOpen(false)}>Venues</NavLink>
        <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Login</NavLink>
        <NavLink to="/register" onClick={() => setIsMenuOpen(false)}>Register</NavLink> {/* Added register NavLink */}
        <NavLink to="/admin" onClick={() => setIsMenuOpen(false)}>Admin</NavLink>
      </NavLinksContainer>
    </Nav>
  );
};

export default Navigation;
