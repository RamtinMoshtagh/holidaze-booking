import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for programmatic navigation
import styled from 'styled-components';

const Card = styled.div`
  cursor: pointer; // Make it obvious the card is clickable
  width: calc(100% - 20px); 
  margin: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #fff;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (min-width: 576px) {
    width: 48%;
  }

  @media (min-width: 992px) {
    width: 20%;
  }
`;

const VenueImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const VenueTitle = styled.h3`
  margin: 10px 0 5px;
  color: #333;
`;

const VenueDescription = styled.p`
  color: #666;
  font-size: 14px;
`;

const VenueCard = ({ venue }) => {
  const navigate = useNavigate();

  // Function to handle card click
  const handleClick = () => {
    navigate(`/venues/${venue.id}`); // Navigate to the VenueDetails page
  };

  return (
    <Card onClick={handleClick} role="button" tabIndex={0} onKeyPress={(e) => { if (e.key === 'Enter') handleClick(); }}>
      <VenueImage src={venue.media[0]?.url} alt={venue.media[0]?.alt || 'Venue image'} />
      <VenueTitle>{venue.name}</VenueTitle>
      <VenueDescription>{venue.description}</VenueDescription>
    </Card>
  );
};

export default VenueCard;
