import React, { useState, useEffect } from 'react';
import api from '../../services/Api';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  padding: 20px;
  text-align: center;
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
      <h1>Available Dates</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <Calendar
          tileDisabled={({ date }) => bookedDates.some(d => d.getTime() === date.getTime())}
        />
      )}
    </CalendarContainer>
  );
};

export default VenueCalendar;
