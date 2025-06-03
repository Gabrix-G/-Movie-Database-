// components/Card.jsx
import React from 'react';
import Button from './Button';

/**
 * Componente Card para mostrar información de películas
 * @param {Object} props - Propiedades de la tarjeta
 * @param {Object} props.movie - Datos de la película
 * @param {Function} props.onEdit - Función para editar película
 * @param {Function} props.onDelete - Función para eliminar película
 */
const Card = ({ movie, onEdit, onDelete }) => {
  // Función para obtener el color según la calificación
  const getRatingColor = (rating) => {
    if (rating >= 8) return 'text-green-600 bg-green-100';
    if (rating >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  // Función para obtener el color del género
  const getGenreColor = (genre) => {
    const colors = {
      'Accion': 'bg-red-100 text-red-800',
      'Comedia': 'bg-yellow-100 text-yellow-800',
      'Drama': 'bg-blue-100 text-blue-800',
      'Terror': 'bg-purple-100 text-purple-800',
      'Romance': 'bg-pink-100 text-pink-800',
      'Ciencia Ficcion': 'bg-indigo-100 text-indigo-800',
      'Animacion': 'bg-green-100 text-green-800',
    };
    return colors[genre] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Header de la tarjeta */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
        <h3 className="text-xl font-bold text-white truncate">
          {movie.pelicula}
        </h3>
        <p className="text-blue-100 text-sm">
          Año: {movie.estreno}
        </p>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-6">
        {/* Género */}
        <div className="mb-4">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getGenreColor(movie.genero)}`}>
            {movie.genero}
          </span>
        </div>

        {/* Calificación */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Calificación:</span>
            <div className={`px-3 py-2 rounded-lg font-bold text-lg ${getRatingColor(movie.calificacion)}`}>
              {movie.calificacion}/10
            </div>
          </div>
          
          {/* Barra de progreso visual */}
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(movie.calificacion / 10) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-3">
          <Button
            variant="primary"
            size="small"
            onClick={() => onEdit(movie)}
            className="flex-1"
          >
            ✏️ Editar
          </Button>
          <Button
            variant="danger"
            size="small"
            onClick={() => onDelete(movie.id)}
            className="flex-1"
          >
            🗑️ Eliminar
          </Button>
        </div>
      </div>

      {/* ID para referencia (opcional, puede ocultarse en producción) */}
      <div className="px-6 pb-2">
        <span className="text-xs text-gray-400">ID: {movie.id}</span>
      </div>
    </div>
  );
};

export default Card;