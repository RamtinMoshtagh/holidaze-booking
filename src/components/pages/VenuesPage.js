// src/components/pages/VenuesPage.js
import React, { useState, useEffect } from 'react';
import VenueList from '../common/VenueList';  // Adjust the import path as needed
import SearchVenues from '../common/SearchVenues'; // Adjust the import path as needed
import api from '../../services/Api';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 20px;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const Description = styled.p`
  color: #666;
  font-size: 1rem;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 20px;
`;

const LoadingMessage = styled.p`
  color: #007bff;
  font-size: 1rem;
  margin-top: 20px;
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
      <Title>Venues</Title>
      <Description>Browse through our list of available venues or search for a specific one.</Description>
      <SearchVenues onSearch={handleSearch} />
      {loading ? (
        <LoadingMessage>Loading venues...</LoadingMessage>
      ) : (
        <VenueList venues={venues} error={error} />
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </PageContainer>
  );
};

export default VenuesPage;
