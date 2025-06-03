// hooks/useFetchData.js
import { useState, useEffect } from 'react';

/**
 * Custom hook para obtener datos de la API
 * @param {string} url - URL de la API
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  // Función para refrescar los datos manualmente
  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};