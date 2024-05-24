import React from 'react';
import styled from 'styled-components';
import Navigation from '../common/Navigation';

const HeaderContainer = styled.header`
  background-color: #f8f9fa;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Title = styled.h1`
  font-size: 1.5em;
  color: #333;
  margin: 0;
`;

const Header = () => {
  return (
    <HeaderContainer aria-label="Header">
      <Title>Holidaze</Title>
      <Navigation />
    </HeaderContainer>
  );
};

export default Header;
