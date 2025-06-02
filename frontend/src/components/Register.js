import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "./Login.css";

const Register = () => {
  const [form, setForm] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: ""
  });
  const [success, setSuccess] = useState("");
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    const result = await register(form);
    if (result.success) {
      setSuccess("Usuario registrado exitosamente. Redirigiendo al login...");
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Registro</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="FirstName"
              placeholder="Nombre"
              value={form.FirstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="LastName"
              placeholder="Apellido"
              value={form.LastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="Email"
              placeholder="Email"
              value={form.Email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="Password"
              placeholder="Contraseña"
              value={form.Password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && (
            <div className="success-message">
              <span className="checkmark">✔️</span>
              {success}
            </div>
          )}
          <button type="submit" className="login-button">Registrarse</button>
        </form>
        <button 
          className="login-button" 
          style={{marginTop: 10, background: '#ac1754'}} 
          onClick={() => navigate('/login')}
        >
          Volver al Login
        </button>
      </div>
    </div>
  );
};

export default Register; 