// src/components/common/CreateBooking.js
import React, { useState } from 'react';
import { useAuth } from '../hooks/AuthContext'; // Ensure the correct path
import api from '../../services/Api';
import styled from 'styled-components';

const BookingForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Input = styled.input`
  margin: 10px;
  padding: 10px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid #ccc;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

const CreateBooking = ({ venueId }) => {
  const { token } = useAuth();
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await api.post('/holidaze/bookings', {
        dateFrom,
        dateTo,
        guests: Number(guests), // Ensure guests is a number
        venueId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSuccess('Booking created successfully!');
    } catch (err) {
      setError('Failed to create booking: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookingForm onSubmit={handleSubmit}>
      <h2>Create Booking</h2>
      <Input
        type="date"
        value={dateFrom}
        onChange={(e) => setDateFrom(e.target.value)}
        placeholder="From Date"
        required
      />
      <Input
        type="date"
        value={dateTo}
        onChange={(e) => setDateTo(e.target.value)}
        placeholder="To Date"
        required
      />
      <Input
        type="number"
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
        placeholder="Guests"
        min="1"
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Booking...' : 'Create Booking'}
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </BookingForm>
  );
};

export default CreateBooking;
