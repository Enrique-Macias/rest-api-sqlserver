import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/login");
  };

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
          className={`nav-button ${location.pathname === '/profile' ? 'active' : ''}`}
          onClick={() => navigate('/profile')}
        >
          <FaUser className="nav-icon" />
        </button>
        <button 
          className="nav-button logout"
          onClick={handleLogout}
          title="Cerrar Sesión"
        >
          <FaSignOutAlt className="nav-icon" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 