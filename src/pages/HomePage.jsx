// pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Title from '../components/Title';
import Button from '../components/Button';
import Card from '../components/Card';
import Message, { Toast } from '../components/Message';
import { useFetchData } from '../hooks/useFetchData';
import { useSaveData } from '../hooks/useSaveData';
import { useDeleteData } from '../hooks/useDeleteData';
import { url } from '../utils/apiUrl';

/**
 * Página principal (Dashboard) con funcionalidad CRUD completa
 */
const HomePage = () => {
  // Estados para la aplicación
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [toast, setToast] = useState({ show: false, type: 'info', message: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('');

  // Custom hooks para CRUD
  const { data: movies, loading, error, refetch } = useFetchData(url);
  const { createMovie, updateMovie, loading: saveLoading } = useSaveData(url);
  const { deleteMovie, loading: deleteLoading } = useDeleteData(url);

  // React Hook Form
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset, 
    setValue 
  } = useForm();

  // Lista de géneros disponibles
  const genres = [
    'Accion', 'Comedia', 'Drama', 'Terror', 'Romance', 
    'Ciencia Ficcion', 'Animacion', 'Documental', 'Musical'
  ];

  // Función para mostrar toast
  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => setToast({ show: false, type: 'info', message: '' }), 3000);
  };

  // Función para abrir formulario de nueva película
  const openNewMovieForm = () => {
    setEditingMovie(null);
    reset();
    setIsFormOpen(true);
  };

  // Función para editar película
  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setValue('pelicula', movie.pelicula);
    setValue('genero', movie.genero);
    setValue('estreno', movie.estreno);
    setValue('calificacion', movie.calificacion);
    setIsFormOpen(true);
  };

  // Función para eliminar película
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta película?')) {
      try {
        await deleteMovie(id);
        showToast('success', 'Película eliminada exitosamente');
        refetch();
      } catch (error) {
        showToast('error', 'Error al eliminar la película');
      }
    }
  };

  // Función para guardar película (crear o actualizar)
  const onSubmit = async (data) => {
    try {
      if (editingMovie) {
        await updateMovie(editingMovie.id, data);
        showToast('success', 'Película actualizada exitosamente');
      } else {
        await createMovie(data);
        showToast('success', 'Película creada exitosamente');
      }
      
      setIsFormOpen(false);
      reset();
      setEditingMovie(null);
      refetch();
    } catch (error) {
      showToast('error', editingMovie ? 'Error al actualizar la película' : 'Error al crear la película');
    }
  };

  // Función para cerrar formulario
  const closeForm = () => {
    setIsFormOpen(false);
    reset();
    setEditingMovie(null);
  };

  // Filtrar películas
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.pelicula.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = genreFilter === '' || movie.genero === genreFilter;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast notification */}
      <Toast
        type={toast.type}
        show={toast.show}
        onClose={() => setToast({ show: false, type: 'info', message: '' })}
      >
        {toast.message}
      </Toast>

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <Title level="h1" variant="white" center>
            🎬 CineDB - Tu Base de Datos de Películas
          </Title>
          <p className="text-center text-blue-100 mt-2">
            Organiza, califica y descubre tus películas favoritas
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Controles superiores */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Búsqueda y filtros */}
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <input
                type="text"
                placeholder="Buscar película..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={genreFilter}
                onChange={(e) => setGenreFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todos los géneros</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            {/* Botón agregar película */}
            <Button
              variant="primary"
              onClick={openNewMovieForm}
              className="whitespace-nowrap"
            >
              ➕ Agregar Película
            </Button>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{movies.length}</div>
              <div className="text-sm text-gray-600">Total Películas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {movies.length > 0 ? (movies.reduce((sum, m) => sum + m.calificacion, 0) / movies.length).toFixed(1) : '0.0'}
              </div>
              <div className="text-sm text-gray-600">Promedio</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {movies.filter(m => m.calificacion >= 8).length}
              </div>
              <div className="text-sm text-gray-600">Excelentes (8+)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {[...new Set(movies.map(m => m.genero))].length}
              </div>
              <div className="text-sm text-gray-600">Géneros</div>
            </div>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando películas...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <Message type="error">
            Error al cargar las películas: {error}
          </Message>
        )}

        {/* Lista de películas */}
        {!loading && !error && (
          <>
            {filteredMovies.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <span className="text-6xl mb-4 block">🎭</span>
                <Title level="h3" className="mb-2">
                  {movies.length === 0 ? 'No hay películas registradas' : 'No se encontraron películas'}
                </Title>
                <p className="text-gray-600 mb-6">
                  {movies.length === 0 
                    ? 'Comienza agregando tu primera película favorita'
                    : 'Intenta con otros términos de búsqueda'
                  }
                </p>
                {movies.length === 0 && (
                  <Button variant="primary" onClick={openNewMovieForm}>
                    ➕ Agregar Primera Película
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMovies.map(movie => (
                  <Card
                    key={movie.id}
                    movie={movie}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal del formulario */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header del modal */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-t-2xl">
              <Title level="h3" variant="white">
                {editingMovie ? '✏️ Editar Película' : '➕ Nueva Película'}
              </Title>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-6">
              {/* Título de la película */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título de la Película *
                </label>
                <input
                  type="text"
                  {...register('pelicula', { 
                    required: 'El título es obligatorio',
                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: Avengers"
                />
                {errors.pelicula && (
                  <p className="text-red-500 text-sm mt-1">{errors.pelicula.message}</p>
                )}
              </div>

              {/* Género */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Género *
                </label>
                <select
                  {...register('genero', { required: 'El género es obligatorio' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecciona un género</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
                {errors.genero && (
                  <p className="text-red-500 text-sm mt-1">{errors.genero.message}</p>
                )}
              </div>

              {/* Año de estreno */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Año de Estreno *
                </label>
                <input
                  type="number"
                  {...register('estreno', { 
                    required: 'El año es obligatorio',
                    min: { value: 1900, message: 'Año mínimo: 1900' },
                    max: { value: new Date().getFullYear() + 1, message: 'Año máximo: ' + (new Date().getFullYear() + 1) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: 2020"
                />
                {errors.estreno && (
                  <p className="text-red-500 text-sm mt-1">{errors.estreno.message}</p>
                )}
              </div>

              {/* Calificación */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Calificación (1-10) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register('calificacion', { 
                    required: 'La calificación es obligatoria',
                    min: { value: 1, message: 'Calificación mínima: 1' },
                    max: { value: 10, message: 'Calificación máxima: 10' }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: 9.0"
                />
                {errors.calificacion && (
                  <p className="text-red-500 text-sm mt-1">{errors.calificacion.message}</p>
                )}
              </div>

              {/* Botones */}
              <div className="flex gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={saveLoading}
                  className="flex-1"
                >
                  {saveLoading ? '⏳ Guardando...' : (editingMovie ? '💾 Actualizar' : '➕ Crear')}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={closeForm}
                  disabled={saveLoading}
                  className="flex-1"
                >
                  ❌ Cancelar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;