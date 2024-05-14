// src/hooks/useVenues.js
import { useState, useEffect } from 'react';
import api from '../../services/Api';  // Adjust the import path as needed

const useVenues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/holidaze/venues');
        setVenues(response.data.data); // assuming the data is wrapped inside a data object
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch venues: ' + err.message);
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  return { venues, loading, error };
};

export default useVenues;
