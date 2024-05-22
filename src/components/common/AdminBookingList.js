// AdminBookingList.js
import React from 'react';
import styled from 'styled-components';

const BookingListContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const BookingItem = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #f1f1f1;
`;

const BookingDetails = styled.div`
  display: flex;
  flex-direction: column;

  & > p {
    margin: 5px 0;
  }
`;

const BookingTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #007bff;
`;

const NoBookingsMessage = styled.p`
  color: #333;
  font-size: 16px;
`;

const AdminBookingList = ({ venueTitle, bookings }) => (
  <BookingListContainer>
    {bookings.length === 0 ? (
      <NoBookingsMessage>No bookings found for this venue.</NoBookingsMessage>
    ) : (
      bookings.map((booking) => (
        <BookingItem key={booking.id}>
          <BookingTitle>{venueTitle}</BookingTitle>
          <BookingDetails>
            <p><strong>Date From:</strong> {new Date(booking.dateFrom).toLocaleDateString()}</p>
            <p><strong>Date To:</strong> {new Date(booking.dateTo).toLocaleDateString()}</p>
            <p><strong>Guests:</strong> {booking.guests}</p>
          </BookingDetails>
        </BookingItem>
      ))
    )}
  </BookingListContainer>
);

export default AdminBookingList;
