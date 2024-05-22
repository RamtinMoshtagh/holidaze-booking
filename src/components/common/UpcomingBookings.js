import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/AuthContext';
import api from '../../services/Api';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 2em;
  text-align: left;

  @media (min-width: 768px) {
    text-align: center;
  }
`;

const BookingsContainer = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
`;

const BookingCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 300px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    width: 300px;
  }
`;

const BookingImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 15px;
`;

const BookingDetails = styled.div`
  width: 100%;
`;

const BookingLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  &:hover {
    text-decoration: underline;
  }
`;

const UpcomingBookings = () => {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/holidaze/profiles/${user.name}/bookings?_venue=true`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBookings(response.data.data);
      } catch (err) {
        setError('Failed to fetch bookings: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user, token]);

  return (
    <Container>
      <Title>Upcoming Bookings</Title>
      <BookingsContainer>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && bookings.length === 0 && <p>No bookings found.</p>}
        {!loading && !error && bookings.map((booking) => (
          <BookingCard key={booking.id}>
            {booking.venue && (
              <BookingImage src={booking.venue.media[0]?.url} alt={booking.venue.media[0]?.alt || 'Venue image'} />
            )}
            <BookingDetails>
              <p><strong>From:</strong> {new Date(booking.dateFrom).toLocaleDateString()}</p>
              <p><strong>To:</strong> {new Date(booking.dateTo).toLocaleDateString()}</p>
              <p><strong>Guests:</strong> {booking.guests}</p>
              {booking.venue && (
                <>
                  <p><strong>Venue:</strong> {booking.venue.name}</p>
                  <BookingLink to={`/venues/${booking.venue.id}`}>View Venue</BookingLink>
                </>
              )}
            </BookingDetails>
          </BookingCard>
        ))}
      </BookingsContainer>
    </Container>
  );
};

export default UpcomingBookings;
