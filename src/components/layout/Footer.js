import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #343a40;
  color: white;
  text-align: center;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box; // Ensures padding doesn't affect the width
  position: fixed; // Changed from absolute to fixed for continuous visibility
  bottom: 0;
  left: 0;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem; // Less padding on smaller screens
  }
`;

const Footer = () => (
  <FooterContainer aria-label="Footer">
    © 2024 Holidaze. All rights reserved.
  </FooterContainer>
);

export default Footer;
