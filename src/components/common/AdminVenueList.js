// AdminVenueList.js
import React from 'react';
import styled from 'styled-components';
import AdminVenueItem from './AdminVenueItem';

const AdminVenueListContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const NoVenuesMessage = styled.p`
  color: #333;
  font-size: 16px;
`;

const AdminVenueList = ({ venues, onUpdate, onDelete, onViewBookings }) => (
  <AdminVenueListContainer>
    {venues.length === 0 ? (
      <NoVenuesMessage>No venues found.</NoVenuesMessage>
    ) : (
      venues.map((venue) => (
        <AdminVenueItem
          key={venue.id}
          venue={venue}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onViewBookings={onViewBookings}
        />
      ))
    )}
  </AdminVenueListContainer>
);

export default AdminVenueList;
