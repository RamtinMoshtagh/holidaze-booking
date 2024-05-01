import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: #343a40;
  color: white;
  text-align: center;
  padding: 20px;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Footer = () => (
  <FooterContainer>
    © 2024 Holidaze. All rights reserved.
  </FooterContainer>
);

export default Footer;
