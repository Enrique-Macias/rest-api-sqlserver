import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { endpoints } from '../config/api';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay un usuario guardado al montar el componente
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      // Configurar el token en axios
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await axios.post(endpoints.login, {
        Email: email,
        Password: password,
      });
      
      const { user: userData, token } = response.data;
      
      // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      
      // Configurar axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(userData);
      navigate('/sql-dashboard');
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al iniciar sesión';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      await axios.post(endpoints.register, userData);
      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al registrar usuario';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/login');
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated
  };
};

export default useAuth; 