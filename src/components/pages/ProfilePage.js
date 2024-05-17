import React from 'react';
import { useAuth } from '../hooks/AuthContext'; // Make sure this path is correct

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div>
      <h1>Profile</h1>
      {isAuthenticated ? (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* Display additional user details and options based on their role */}
          {user.isVenueManager && (
            <p>Manage your venues and bookings here.</p>
          )}
        </>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default ProfilePage;
