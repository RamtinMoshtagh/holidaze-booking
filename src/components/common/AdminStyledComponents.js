// AdminStyledComponents.js
import styled from 'styled-components';

export const AdminContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const AdminHeading = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 2.5em;
  font-weight: bold;
`;

export const AdminErrorMessage = styled.p`
  color: red;
  margin-top: 20px;
  font-size: 1em;
  font-weight: bold;
`;

export const AdminSuccessMessage = styled.p`
  color: green;
  margin-top: 20px;
  font-size: 1em;
  font-weight: bold;
`;
