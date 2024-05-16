import React from 'react';
import useVenues from '../hooks/useVenues';
import styled from 'styled-components';
import VenueCard from './VenueCard'; // Ensure the path is correct

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
  gap: 20px; /* Ensures consistent spacing regardless of screen size */
`;

const VenueList = () => {
  const { venues, loading, error } = useVenues();

  if (loading) return <p>Loading venues...</p>;
  if (error) return <p>Error loading venues: {error}</p>;

  return (
    <ListContainer>
      {venues.map(venue => <VenueCard key={venue.id} venue={venue} />)}
    </ListContainer>
  );
};

export default VenueList;
