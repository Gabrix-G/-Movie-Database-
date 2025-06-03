// hooks/useDeleteData.js
import { useState } from 'react';

/**
 * Custom hook para eliminar datos de la API
 * @param {string} baseUrl - URL base de la API
 * @returns {Object} - { deleteData, loading, error }
 */
export const useDeleteData = (baseUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Eliminar una película por ID
   * @param {number} id - ID de la película a eliminar
   * @returns {Promise<boolean>} - True si se eliminó correctamente
   */
  const deleteMovie = async (id) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error al eliminar película: ${response.status}`);
      }

      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error deleting movie:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteMovie, loading, error };
};