// hooks/useSaveData.js
import { useState } from 'react';

/**
 * Custom hook para guardar/actualizar datos en la API
 * @param {string} baseUrl - URL base de la API
 * @returns {Object} - { saveData, loading, error }
 */
export const useSaveData = (baseUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Crear una nueva película
   * @param {Object} movieData - Datos de la película
   * @returns {Promise<Object>} - Película creada
   */
  const createMovie = async (movieData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        throw new Error(`Error al crear película: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (err) {
      setError(err.message);
      console.error('Error creating movie:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Actualizar una película existente
   * @param {number} id - ID de la película
   * @param {Object} movieData - Datos actualizados
   * @returns {Promise<Object>} - Película actualizada
   */
  const updateMovie = async (id, movieData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar película: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (err) {
      setError(err.message);
      console.error('Error updating movie:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createMovie, updateMovie, loading, error };
};