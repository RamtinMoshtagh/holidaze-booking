// src/components/pages/VenuesPage.js
import React, { useState, useEffect } from 'react';
import VenueList from '../common/VenueList';  // Adjust the import path as needed
import SearchVenues from '../common/SearchVenues'; // Adjust the import path as needed
import api from '../../services/Api';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const VenuesPage = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/holidaze/venues');
        setVenues(response.data.data);
      } catch (err) {
        setError('Failed to fetch venues: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/holidaze/venues/search?q=${query}`);
      setVenues(response.data.data);
    } catch (err) {
      setError('Failed to search venues: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <h1>Venues</h1>
      <p>Browse through our list of available venues or search for a specific one.</p>
      <SearchVenues onSearch={handleSearch} />
      {loading ? <p>Loading venues...</p> : <VenueList venues={venues} error={error} />}
    </PageContainer>
  );
};

export default VenuesPage;
