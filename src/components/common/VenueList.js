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
`;

const VenueList = ({ venues, error }) => {
  if (error) return <p>Error loading venues: {error}</p>;

  return (
    <ListContainer>
      {venues.map(venue => <VenueCard key={venue.id} venue={venue} />)}
    </ListContainer>
  );
};

export default VenueList;
