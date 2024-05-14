import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinksContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateX(${props => props.show ? '0' : '-100%'});
  transition: transform 0.3s ease-in-out;
  z-index: 10; // Make sure it is above other content

  @media (min-width: 769px) {
    position: static;
    background: none;
    flex-direction: row;
    justify-content: flex-end;
    height: auto;
    transform: none;
  }
`;

const NavLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  padding: 1.2em;
  text-align: center;
  width: 100%; // Full width links for better mobile experience

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
      <MenuIcon onClick={toggleMenu} aria-expanded={isMenuOpen} aria-controls="navigation">
        {isMenuOpen ? '✖' : '☰'}
      </MenuIcon>
      <NavLinksContainer show={isMenuOpen} id="navigation">
        <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
        <NavLink to="/venues" onClick={() => setIsMenuOpen(false)}>Venues</NavLink>
        <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Login</NavLink>
        <NavLink to="/admin" onClick={() => setIsMenuOpen(false)}>Admin</NavLink>
      </NavLinksContainer>
    </Nav>
  );
};

export default Navigation;
