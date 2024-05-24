import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import registerUser from '../../services/Register'; // Import the function
import styled from 'styled-components';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const Container = styled.div`
  max-width: 500px;
  width: 100%;
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
  font-size: 1rem;
  color: #333;
`;

const StyledInput = styled(Input)`
  width: 95%;
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

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 0.8rem;
`;

const LinkStyled = styled(Link)`
  display: block;
  margin-top: 20px;
  color: #0077cc;
  text-decoration: none;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
`;

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    venueManager: false,
    avatar: {
      url: '',
      alt: 'Default Avatar'
    }
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateInput = (name, value) => {
    switch (name) {
      case 'email':
        if (!value) {
          return 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(value)) {
          return 'Email is not valid';
        }
        break;
      case 'name':
        if (!value) {
          return 'Name is required';
        }
        break;
      case 'password':
        if (!value) {
          return 'Password is required';
        } else if (value.length < 8) {
          return 'Password must be at least 8 characters';
        }
        break;
      case 'avatar.url':
        if (value && !/^https:\/\/gravatar\.com\/avatar\/[a-f0-9]{32}\?s=400&d=robohash&r=x$/.test(value)) {
          return 'Avatar URL must be a valid Gravatar URL';
        }
        break;
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === 'checkbox' ? checked : value;
    const [field, subfield] = name.split('.');

    if (subfield) {
      setFormData(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          [subfield]: updatedValue
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: updatedValue
      }));
    }

    const error = validateInput(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key === 'avatar') {
        const avatarError = validateInput('avatar.url', formData.avatar.url);
        if (avatarError) newErrors['avatar.url'] = avatarError;
      } else {
        const error = validateInput(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no avatar URL provided, set the default one
    const avatarUrl = formData.avatar.url || 'https://gravatar.com/avatar/36985745d7c2910507e598e17cecfd9a?s=400&d=robohash&r=x';

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        venueManager: formData.venueManager,
        avatar: {
          url: avatarUrl,
          alt: 'Default Avatar'
        }
      };

      console.log('Registering user with data:', userData); // Debugging log
      const response = await registerUser(userData); // Use the registerUser function
      if (response) {
        console.log('Registration successful:', response);
        // Redirect to login after successful registration
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration Error:', error);
      setErrors({ form: error.response?.data?.message || 'Failed to register' });
    }
  };

  return (
    <Container>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        {['name', 'email', 'password'].map(field => (
          <FormGroup key={field}>
            <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
            <StyledInput
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter your ${field}`}
              required
            />
            {errors[field] && <ErrorMsg>{errors[field]}</ErrorMsg>}
          </FormGroup>
        ))}
        <FormGroup>
          <Label>Avatar URL (optional)</Label>
          <StyledInput
            type="text"
            name="avatar.url"
            value={formData.avatar.url}
            onChange={handleChange}
            placeholder="Enter your avatar URL"
          />
          {errors['avatar.url'] && <ErrorMsg>{errors['avatar.url']}</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <CheckboxLabel>
            <Checkbox
              type="checkbox"
              name="venueManager"
              checked={formData.venueManager}
              onChange={handleChange}
            />
            Register as venue manager
          </CheckboxLabel>
        </FormGroup>
        <Button type="submit">Register</Button>
        {errors.form && <ErrorMsg>{errors.form}</ErrorMsg>}
        <LinkStyled to="/login">Already have an account? Log in</LinkStyled>
      </Form>
    </Container>
  );
};

export default Register;
