import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const DetailsContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  background-color: #f8f9fa;
`;

const DetailsCard = styled.div`
  width: 100%;
  max-width: 960px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 10px;
  text-align: center;
`;

const DetailItem = styled.p`
  color: #666;
  font-size: 1rem;
  margin: 5px 0;
  text-align: justify;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const Image = styled.img`
  flex-grow: 1;
  max-width: 45%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    max-width: 30%;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const MetaItem = styled.span`
  background-color: #e0e0e0;
  padding: 8px 12px;
  border-radius: 12px;
  margin: 5px;
  font-size: 0.9rem;
`;

const LocationInfo = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
  color: #333;
  text-align: center;
`;

const OwnerInfo = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
  text-align: center;
`;

const BookingInfo = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
  width: 100%;
`;

const BookingItem = styled.div`
  margin: 5px 0;
  text-align: center;
`;

const VenueDetails = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        const response = await axios.get(`https://v2.api.noroff.dev/holidaze/venues/${id}`);
        setVenue(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenueDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!venue) return <p>No venue details available.</p>;

  return (
    <DetailsContainer>
      <DetailsCard>
        <Title>{venue?.name}</Title>
        <DetailItem>{venue?.description}</DetailItem>
        <ImageContainer>
          {venue?.media?.map((media, index) => (
            <Image key={index} src={media.url} alt={media.alt || 'Venue image'} />
          ))}
        </ImageContainer>
        <MetaInfo>
          {venue?.meta?.wifi && <MetaItem>Wi-Fi</MetaItem>}
          {venue?.meta?.parking && <MetaItem>Parking</MetaItem>}
          {venue?.meta?.breakfast && <MetaItem>Breakfast Included</MetaItem>}
          {venue?.meta?.pets && <MetaItem>Pets Allowed</MetaItem>}
        </MetaInfo>
        <LocationInfo>
          {venue?.location?.address}, {venue?.location?.city}, {venue?.location?.zip}, {venue?.location?.country}
        </LocationInfo>
        {venue?.owner && (
          <OwnerInfo>
            <strong>Owner:</strong> {venue.owner.name}, {venue.owner.email}
          </OwnerInfo>
        )}
        {venue?.bookings?.length > 0 && (
          <BookingInfo>
            {venue.bookings.map((booking, index) => (
              <BookingItem key={index}>
                Booking from {booking.dateFrom} to {booking.dateTo} - {booking.guests} guests
              </BookingItem>
            ))}
          </BookingInfo>
        )}
      </DetailsCard>
    </DetailsContainer>
  );
};

export default VenueDetails;
