// Input.js
import styled from 'styled-components';

const Input = styled.input`
  padding: 10px;
  margin: 10px 0; // Ensure space above and below each input
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 600px) {
    width: auto;
    margin-right: 10px; // Ensure space between inputs on larger screens
  }
`;

export default Input;
