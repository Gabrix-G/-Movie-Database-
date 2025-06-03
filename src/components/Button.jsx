// components/Button.jsx
import React from 'react';

/**
 * Componente Button reutilizable
 * @param {Object} props - Propiedades del botón
 * @param {string} props.children - Contenido del botón
 * @param {string} props.variant - Tipo de botón (primary, secondary, danger)
 * @param {string} props.size - Tamaño del botón (small, medium, large)
 * @param {boolean} props.disabled - Si el botón está deshabilitado
 * @param {Function} props.onClick - Función a ejecutar al hacer click
 * @param {string} props.type - Tipo HTML del botón
 * @param {string} props.className - Clases CSS adicionales
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  onClick, 
  type = 'button',
  className = '',
  ...props 
}) => {
  // Clases base del botón
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Variantes de color
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
  };
  
  // Tamaños del botón
  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };
  
  // Estilos cuando está deshabilitado
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  
  // Combinar todas las clases
  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${disabled ? disabledClasses : ''}
    ${className}
  `.trim();

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;