import { useState, useEffect } from 'react';
import api from './services/api';

function useFetchVenues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/venues')
      .then(response => {
        setVenues(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching venues", error);
        setLoading(false);
      });
  }, []);

  return { venues, loading };
}

export default useFetchVenues;
