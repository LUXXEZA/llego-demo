import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Menu from './pages/Menu';
import Cocina from './pages/Cocina';
import Mensajero from './pages/Mensajero';
import Dashboard from './pages/Dashboard';
import './App.css';

function NavBar() {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Menu' },
    { to: '/cocina', label: 'Cocina' },
    { to: '/mensajero', label: 'Mensajero' },
    { to: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <nav className="nav-principal">
      <div className="nav-logo">
      
      </div>
      <div className="nav-links">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            style={{
              color: location.pathname === link.to ? 'white' : '#aab4c4',
              textDecoration: 'none',
              fontWeight: location.pathname === link.to ? 700 : 400,
              fontSize: '0.95rem',
              padding: '0.4rem 1rem',
              borderRadius: '6px',
              background: location.pathname === link.to ? '#1f3a5f' : 'transparent',
              transition: 'all 0.2s',
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/cocina" element={<Cocina />} />
          <Route path="/mensajero" element={<Mensajero />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;