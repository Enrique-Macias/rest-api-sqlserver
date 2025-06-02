import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSignOutAlt, FaUser, FaCode } from 'react-icons/fa';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Bienvenido {user ? `${user.FirstName} ${user.LastName}` : "Usuario"}!</h1>
      </div>
      <div className="navbar-menu">
        <button 
          className={`nav-button ${location.pathname === '/sql-dashboard' ? 'active' : ''}`}
          onClick={() => navigate('/sql-dashboard')}
        >
          SQL Datos
        </button>
        <button 
          className={`nav-button ${location.pathname === '/mongo-dashboard' ? 'active' : ''}`}
          onClick={() => navigate('/mongo-dashboard')}
        >
          MongoDB Datos
        </button>
        <button 
          className={`nav-button ${location.pathname === '/lifecycle-demo' ? 'active' : ''}`}
          onClick={() => navigate('/lifecycle-demo')}
          title="Demo del Ciclo de Vida"
        >
          <FaCode className="nav-icon" />
        </button>
        <button 
          className={`nav-button ${location.pathname === '/profile' ? 'active' : ''}`}
          onClick={() => navigate('/profile')}
          title="Perfil"
        >
          <FaUser className="nav-icon" />
        </button>
        <button 
          className="nav-button logout"
          onClick={logout}
          title="Cerrar Sesión"
        >
          <FaSignOutAlt className="nav-icon" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 