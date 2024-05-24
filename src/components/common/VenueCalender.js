import React, { useState, useEffect } from 'react';
import api from '../../services/Api';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  padding: 20px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 2em;
  color: #333;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 16px;
`;

const LoadingMessage = styled.p`
  color: #007bff;
  font-size: 16px;
`;

const VenueCalendar = ({ venueId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/holidaze/venues/${venueId}?_bookings=true`);
        setBookings(response.data.data.bookings);
      } catch (err) {
        setError('Failed to load bookings: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [venueId]);

  const bookedDates = bookings.map(booking => new Date(booking.dateFrom));

  return (
    <CalendarContainer>
      <Title>Available Dates</Title>
      {loading && <LoadingMessage>Loading...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!loading && !error && (
        <Calendar
          tileDisabled={({ date }) => bookedDates.some(d => d.getTime() === date.getTime())}
        />
      )}
    </CalendarContainer>
  );
};

export default VenueCalendar;
