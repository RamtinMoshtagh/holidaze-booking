// src/components/common/VenueList.js
import React from 'react';
import styled from 'styled-components';
import VenueCard from './VenueCard'; // Ensure the path is correct

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
  gap: 20px; /* Ensures consistent spacing regardless of screen size */
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 0 auto;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 20px;
  font-size: 1.2em;
`;

const VenueList = ({ venues, error }) => {
  if (error) return <ErrorMessage>Error loading venues: {error}</ErrorMessage>;

  return (
    <ListContainer>
      {venues.length === 0 ? (
        <p>No venues found.</p>
      ) : (
        venues.map(venue => <VenueCard key={venue.id} venue={venue} />)
      )}
    </ListContainer>
  );
};

export default VenueList;
