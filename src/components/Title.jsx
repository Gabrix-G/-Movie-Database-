// components/Title.jsx
import React from 'react';

/**
 * Componente Title reutilizable para títulos
 * @param {Object} props - Propiedades del título
 * @param {string} props.children - Contenido del título
 * @param {string} props.level - Nivel del título (h1, h2, h3, h4, h5, h6)
 * @param {string} props.variant - Variante de estilo (primary, secondary, gradient)
 * @param {string} props.className - Clases CSS adicionales
 * @param {boolean} props.center - Si el título debe estar centrado
 */
const Title = ({ 
  children, 
  level = 'h1', 
  variant = 'primary', 
  className = '', 
  center = false,
  ...props 
}) => {
  // Configuración de variantes
  const variants = {
    primary: 'text-gray-800',
    secondary: 'text-gray-600',
    gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent',
    white: 'text-white',
  };

  // Configuración de tamaños según el nivel
  const sizes = {
    h1: 'text-4xl md:text-5xl font-bold',
    h2: 'text-3xl md:text-4xl font-bold',
    h3: 'text-2xl md:text-3xl font-semibold',
    h4: 'text-xl md:text-2xl font-semibold',
    h5: 'text-lg md:text-xl font-medium',
    h6: 'text-base md:text-lg font-medium',
  };

  // Clases combinadas
  const titleClasses = `
    ${sizes[level]}
    ${variants[variant]}
    ${center ? 'text-center' : ''}
    ${className}
  `.trim();

  // Crear el elemento según el nivel
  const Tag = level;

  return (
    <Tag className={titleClasses} {...props}>
      {children}
    </Tag>
  );
};

export default Title;