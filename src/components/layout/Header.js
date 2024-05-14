// src/components/layout/Header.js
import React from 'react';
import styled from 'styled-components';
import Navigation from '../common/Navigation'; // Adjust the path as necessary

const HeaderContainer = styled.header`
  background-color: #f8f9fa;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h1>Holidaze</h1>
      <Navigation />
    </HeaderContainer>
  );
};

export default Header;
