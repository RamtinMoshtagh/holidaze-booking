import { useState, useEffect } from 'react';
import api from '../services/Api'; // Adjust the path to match your project's structure

/**
 * Custom hook to fetch venues data.
 * @returns {object} An object containing the venues data and loading state.
 */
function useFetchVenues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await api.get('/venues');
        setVenues(response.data.data); // Adjust based on your API response structure
      } catch (error) {
        console.error("Error fetching venues", error);
        setError(error.message || "An error occurred while fetching venues");
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  return { venues, loading, error };
}

export default useFetchVenues;
