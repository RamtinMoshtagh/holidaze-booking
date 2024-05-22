// Button.js
import styled from 'styled-components';

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 10px 5px 10px 0; // Ensure space around buttons
  
  &:hover {
    background-color: #0056b3;
  }
`;

export default Button;
