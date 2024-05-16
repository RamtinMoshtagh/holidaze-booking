import React from 'react';
import styled from 'styled-components';
import Navigation from '../common/Navigation';

const HeaderContainer = styled.header`
  background-color: #f8f9fa;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative; // Ensures the header is on top
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
