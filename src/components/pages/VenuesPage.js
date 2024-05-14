// src/components/pages/VenuesPage.js
import React from 'react';
import VenueList from '../common/VenueList';  // Adjust the import path as needed

const VenuesPage = () => {
  return (
    <div>
      <h1>Venues</h1>
      <p>Browse through our list of available venues.</p>
      <VenueList />
    </div>
  );
};

export default VenuesPage;
