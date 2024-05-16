// src/hooks/useVenues.js
import { useState, useEffect } from 'react';
import api from '../../services/Api';

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
        setVenues(response.data.data);
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
