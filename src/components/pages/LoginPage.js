import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import Input from '../common/Input';
import Button from '../common/Button';
import login from '../../services/Login'; // Ensure this path is correct and the function is properly exported

const Container = styled.div`
  max-width: 500px;
  width: 100%; // Ensures it uses the full available width on smaller screens
  margin: 40px auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  border-radius: 8px;
  background-color: #fff;

  @media (max-width: 768px) {
    max-width: 90%; // More responsive for smaller screens
    padding: 15px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px; // Slightly larger spacing for readability
`;

const StyledInput = styled(Input)`
  width: 100%; // Full width to use the available space
  padding: 12px; // Better padding for easier interaction
  border-radius: 4px;
  border: 1px solid #ccc;

  &:focus {
    border-color: #0077cc; // Blue border on focus for better visibility
    outline: none; // Removes default focus outline
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px; // Increased spacing between form groups
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 0.9rem; // Smaller font size for error messages
`;

const StyledLink = styled(Link)`
  display: block;
  margin-top: 20px;
  color: #0077cc;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError('Both fields are required');
      return;
    }

    try {
      const data = await login(email, password);
      if (data.accessToken) {
        localStorage.setItem('token', data.accessToken);
        navigate(data.venueManager ? '/admin' : '/'); // Adjust navigation based on user role
      } else {
        throw new Error('No access token received');
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.message || 'Failed to login');
    }
  };

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Email</Label>
          <StyledInput type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <StyledInput type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
        </FormGroup>
        <Button type="submit">Login</Button>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <StyledLink to="/register">Don't have an account? Register Here</StyledLink>
      </Form>
    </Container>
  );
};

export default Login;
