import { useState, useEffect } from 'react';
import api, { setAuthToken } from '../../services/Api'; // Ensure the correct path

const useVenues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token'); // Get the token from local storage
        if (!token) {
          throw new Error('No access token available');
        }

        setAuthToken(token); // Set the access token

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

  return { venues, loading, error };
};

export default useVenues;
