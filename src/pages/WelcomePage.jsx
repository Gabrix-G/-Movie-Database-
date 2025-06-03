// pages/WelcomePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import Button from '../components/Button';

/**
 * Página de bienvenida que redirige automáticamente al dashboard
 */
const WelcomePage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [isAutoRedirect, setIsAutoRedirect] = useState(true);

  // Efecto para el countdown automático
  useEffect(() => {
    if (!isAutoRedirect) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, isAutoRedirect]);

  // Función para ir al dashboard manualmente
  const goToDashboard = () => {
    setIsAutoRedirect(false);
    navigate('/dashboard');
  };

  // Función para cancelar la redirección automática
  const cancelAutoRedirect = () => {
    setIsAutoRedirect(false);
    setCountdown(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Icono principal */}
        <div className="mb-8 animate-bounce">
          <div className="inline-block p-6 bg-white/10 rounded-full backdrop-blur-sm">
            <span className="text-6xl">🎬</span>
          </div>
        </div>

        {/* Título principal */}
        <Title level="h1" variant="white" center className="mb-4">
          ¡Bienvenido a CineDB!
        </Title>

        {/* Subtítulo */}
        <Title level="h3" variant="white" center className="mb-8 opacity-90 font-normal">
          Tu base de datos personal de películas
        </Title>

        {/* Descripción */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
          <p className="text-white/90 text-lg leading-relaxed mb-6">
            Descubre, organiza y califica tus películas favoritas. 
            Sebastián ha creado esta herramienta especialmente para los 
            amantes del cine que desean mantener un registro completo 
            de sus experiencias cinematográficas.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/5 rounded-lg p-4">
              <span className="text-2xl mb-2 block">📝</span>
              <p className="text-white/80">Registra películas con detalles completos</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <span className="text-2xl mb-2 block">⭐</span>
              <p className="text-white/80">Califica y organiza por género</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <span className="text-2xl mb-2 block">🔍</span>
              <p className="text-white/80">Consulta tu historial fácilmente</p>
            </div>
          </div>
        </div>

        {/* Sección de redirección */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
          {isAutoRedirect && countdown > 0 ? (
            <>
              <p className="text-white/90 mb-4">
                Serás redirigido automáticamente en:
              </p>
              <div className="text-4xl font-bold text-white mb-4 animate-pulse">
                {countdown}
              </div>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="primary"
                  onClick={goToDashboard}
                  className="bg-white/20 hover:bg-white/30 border border-white/20"
                >
                  Ir ahora 🚀
                </Button>
                <Button
                  variant="secondary"
                  onClick={cancelAutoRedirect}
                  className="bg-transparent border border-white/30 text-white hover:bg-white/10"
                >
                  Cancelar
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-white/90 mb-4">
                ¿Listo para comenzar tu experiencia cinematográfica?
              </p>
              <Button
                variant="primary"
                size="large"
                onClick={goToDashboard}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transform hover:scale-105 transition-all duration-200"
              >
                Ingresar a CineDB 🎬
              </Button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-white/60 text-sm">
          <p>Desarrollado con ❤️ para los amantes del cine</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;