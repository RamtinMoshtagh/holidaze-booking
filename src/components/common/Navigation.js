// src/components/common/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  padding: 0.5em 0;

  a {
    color: #007bff;
    text-decoration: none;
    padding: 0.5em 1em;

    &:hover {
      color: #0056b3;
    }
  }
`;

const Navigation = () => {
  return (
    <Nav>
      <Link to="/">Home</Link>
      <Link to="/venues">Venues</Link>
      <Link to="/login">Login</Link>
      <Link to="/admin">Admin</Link>
    </Nav>
  );
};

export default Navigation;
