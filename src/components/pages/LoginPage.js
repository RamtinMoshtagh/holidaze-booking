import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Input from '../common/Input';
import Button from '../common/Button';
import { useAuth } from '../hooks/AuthContext';
import { login as loginService } from '../../services/Login';


const Container = styled.div`
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  border-radius: 8px;
  background-color: #fff;
  @media (max-width: 768px) {
    max-width: 90%;
    padding: 15px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const StyledInput = styled(Input)`
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  &:focus {
    border-color: #0077cc;
    outline: none;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 0.9rem;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError('Both fields are required');
      return;
    }

    try {
      await login(email, password, loginService);
      navigate('/profile');
    } catch (error) {
      setError('Failed to login: ' + error.message);
    }
  };

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Email</Label>
          <StyledInput type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <StyledInput type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required />
        </FormGroup>
        <Button type="submit">Login</Button>
        {error && <ErrorMsg>{error}</ErrorMsg>}
      </Form>
    </Container>
  );
};

export default Login;
