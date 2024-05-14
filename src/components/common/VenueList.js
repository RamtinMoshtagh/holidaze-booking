// src/components/VenueList.js
import React from 'react';
import useVenues from '../hooks/useVenues';
import styled from 'styled-components';

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
`;

const VenueCard = styled.div`
  width: 250px;
  margin: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 8px;
  background-color: #fff;
`;

const VenueList = () => {
  const { venues, loading, error } = useVenues();

  if (loading) return <p>Loading venues...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ListContainer>
      {venues.map(venue => (
        <VenueCard key={venue.id}>
          <h3>{venue.name}</h3>
          <p>{venue.description}</p>
          <img src={venue.media[0]?.url} alt={venue.media[0]?.alt} style={{ width: '100%' }} />
        </VenueCard>
      ))}
    </ListContainer>
  );
};

export default VenueList;
