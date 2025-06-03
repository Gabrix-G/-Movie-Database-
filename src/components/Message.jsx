// components/Message.jsx
import React from 'react';

/**
 * Componente Message para mostrar mensajes de diferentes tipos
 * @param {Object} props - Propiedades del mensaje
 * @param {string} props.children - Contenido del mensaje
 * @param {string} props.type - Tipo de mensaje (success, error, warning, info)
 * @param {boolean} props.show - Si mostrar o no el mensaje
 * @param {Function} props.onClose - Función para cerrar el mensaje
 * @param {string} props.className - Clases CSS adicionales
 */
const Message = ({ 
  children, 
  type = 'info', 
  show = true, 
  onClose, 
  className = '',
  ...props 
}) => {
  if (!show) return null;

  // Configuración de tipos de mensaje
  const types = {
    success: {
      bgColor: 'bg-green-50 border-green-200',
      textColor: 'text-green-800',
      icon: '✅',
      iconBg: 'bg-green-100',
    },
    error: {
      bgColor: 'bg-red-50 border-red-200',
      textColor: 'text-red-800',
      icon: '❌',
      iconBg: 'bg-red-100',
    },
    warning: {
      bgColor: 'bg-yellow-50 border-yellow-200',
      textColor: 'text-yellow-800',
      icon: '⚠️',
      iconBg: 'bg-yellow-100',
    },
    info: {
      bgColor: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-800',
      icon: 'ℹ️',
      iconBg: 'bg-blue-100',
    },
  };

  const config = types[type];

  // Clases combinadas
  const messageClasses = `
    ${config.bgColor}
    ${config.textColor}
    border rounded-lg p-4 mb-4 flex items-start gap-3
    ${className}
  `.trim();

  return (
    <div className={messageClasses} {...props}>
      {/* Icono */}
      <div className={`${config.iconBg} rounded-full p-1 flex-shrink-0`}>
        <span className="text-sm">{config.icon}</span>
      </div>
      
      {/* Contenido del mensaje */}
      <div className="flex-1">
        {children}
      </div>
      
      {/* Botón de cerrar (opcional) */}
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 ml-2"
          aria-label="Cerrar mensaje"
        >
          <span className="text-lg">×</span>
        </button>
      )}
    </div>
  );
};

/**
 * Componente Toast para mensajes que aparecen temporalmente
 */
export const Toast = ({ 
  children, 
  type = 'info', 
  show = true, 
  onClose, 
  duration = 3000,
  position = 'top-right',
  ...props 
}) => {
  const [visible, setVisible] = React.useState(show);

  React.useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!visible) return null;

  // Posiciones del toast
  const positions = {
    'top-right': 'fixed top-4 right-4 z-50',
    'top-left': 'fixed top-4 left-4 z-50',
    'bottom-right': 'fixed bottom-4 right-4 z-50',
    'bottom-left': 'fixed bottom-4 left-4 z-50',
    'top-center': 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50',
    'bottom-center': 'fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50',
  };

  return (
    <div className={positions[position]}>
      <Message 
        type={type} 
        show={visible} 
        onClose={() => {
          setVisible(false);
          if (onClose) onClose();
        }}
        className="min-w-80 max-w-md shadow-lg animate-pulse"
        {...props}
      >
        {children}
      </Message>
    </div>
  );
};

export default Message;