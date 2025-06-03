// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';
import './App.css';

/**
 * Componente principal de la aplicación
 * Maneja el enrutamiento entre las diferentes páginas
 */
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta de bienvenida */}
          <Route path="/" element={<WelcomePage />} />
          
          {/* Ruta del dashboard principal */}
          <Route path="/dashboard" element={<HomePage />} />
          
          {/* Ruta por defecto - redirige a la página de bienvenida */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;