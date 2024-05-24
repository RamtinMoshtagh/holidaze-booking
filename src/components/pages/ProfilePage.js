import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext'; // Ensure this path is correct
import styled from 'styled-components';
import api from '../../services/Api'; // Adjust this path to your API service
import UpcomingBookings from '../common/UpcomingBookings'; // Ensure the correct path

const ProfileContainer = styled.div`
  padding: 20px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  object-fit: cover;
  margin-bottom: 20px;
`;

const ProfileBanner = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 20px;
  border-radius: 8px;
`;

const ProfileDetail = styled.p`
  font-size: 1.2em;
  color: #333;
`;

const Input = styled.input`
  margin-top: 10px;
  padding: 8px;
  width: 70%;
  border: 1px solid #ccc;
  border-radius: 4px;

  @media (min-width: 768px) {
    width: 50%;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
`;

const ProfilePage = () => {
  const { user, isAuthenticated, token, updateUserAvatar } = useAuth(); // Ensure token and updateUserAvatar are accessible here
  const [newAvatarUrl, setNewAvatarUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirect unauthenticated users to the login page
    }
  }, [isAuthenticated, navigate]);

  const updateAvatar = async (avatarUrl) => {
    const username = user?.name; // Ensure 'user' is defined and has a name property
    if (!username) {
      setError('User identifier is required for this operation.');
      return;
    }

    try {
      const response = await api.put(`/holidaze/profiles/${username}`, {
        avatar: {
          url: avatarUrl,
          alt: 'Updated Avatar'
        }
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Using the token from AuthContext
        }
      });

      if (response.status === 200) {
        alert('Avatar updated successfully!');
        updateUserAvatar(avatarUrl); // Update the avatar in the context
        setNewAvatarUrl(''); // Clear the input field
        setError('');
      } else {
        throw new Error('Unexpected response from the server');
      }
    } catch (error) {
      console.error("Failed to update avatar:", error);
      setError('Failed to update avatar: ' + error.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <ProfileContainer>
        <h1>Profile</h1>
        <p>Please <Link to="/login">log in</Link> to view your profile.</p>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer>
      <h1>Profile</h1>
      {user.banner && <ProfileBanner src={user.banner.url} alt={user.banner.alt || "Profile banner"} />}
      {user.avatar && <ProfileImage src={user.avatar.url} alt={user.avatar.alt || "Profile avatar"} />}
      <ProfileDetail>Name: {user.name}</ProfileDetail>
      <ProfileDetail>Email: {user.email}</ProfileDetail>
      {user.bio && <ProfileDetail>Bio: {user.bio}</ProfileDetail>}
      <Input
        type="text"
        value={newAvatarUrl}
        onChange={e => setNewAvatarUrl(e.target.value)}
        placeholder="Enter new avatar URL"
      />
      <Button onClick={() => updateAvatar(newAvatarUrl)}>Update Avatar</Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <UpcomingBookings />
    </ProfileContainer>
  );
};

export default ProfilePage;
