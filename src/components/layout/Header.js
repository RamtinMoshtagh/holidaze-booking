import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation'; // Assume Navigation is another component

const HeaderContainer = styled.header`
  background: #f8f9fa;
  padding: 10px 20px;
`;

const Header = () => (
  <HeaderContainer>
    <h1>Holidaze</h1>
    <Navigation />
  </HeaderContainer>
);

export default Header;
