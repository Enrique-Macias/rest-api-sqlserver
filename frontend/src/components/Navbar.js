import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>CR Digital</h1>
      </div>
      <div className="navbar-menu">
        <button 
          className={`nav-button ${location.pathname === '/sql-dashboard' ? 'active' : ''}`}
          onClick={() => navigate('/sql-dashboard')}
        >
          📊 SQL Dashboard
        </button>
        <button 
          className={`nav-button ${location.pathname === '/mongo-dashboard' ? 'active' : ''}`}
          onClick={() => navigate('/mongo-dashboard')}
        >
          🍃 MongoDB Dashboard
        </button>
        <button 
          className="nav-button logout"
          onClick={handleLogout}
        >
          🚪 Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 