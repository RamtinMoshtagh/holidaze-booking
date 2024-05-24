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
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;

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

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const SuccessMessage = styled.p`
  color: green;
  margin-top: 10px;
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
      <FormGroup>
        <Label htmlFor="dateFrom">From Date</Label>
        <Input
          type="date"
          id="dateFrom"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="dateTo">To Date</Label>
        <Input
          type="date"
          id="dateTo"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="guests">Guests</Label>
        <Input
          type="number"
          id="guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          min="1"
          required
        />
      </FormGroup>
      <Button type="submit" disabled={loading}>
        {loading ? 'Booking...' : 'Create Booking'}
      </Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </BookingForm>
  );
};

export default CreateBooking;
