import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Importar los estilos CSS

alert("email: test@test.com, password: contra123");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Attempting login with:', { email, password });
      const response = await axios.post("http://localhost:3000/login", {
        Email: email,
        Password: password,
      });

      console.log('Login response:', response.data);

      // Store both user data and token
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      
      // Set default authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      navigate("/sql-dashboard");
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || "Error al iniciar sesión. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        {/* Sección Izquierda (Texto e Imagen) */}
        <div className="login-left">
          <h2>CR DIGITAL</h2>
          <p>Innovamos para que tú crezcas</p>
          <h3>Welcome.</h3>
          <p>Start your journey now with our management system!</p>
        </div>

        {/* Sección Derecha (Formulario) */}
        <div className="login-right">
          <h2>Login to your account</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
            <button type="submit" className="login-button">
              Login now
            </button>
          </form>

          <button className="google-button">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
            />
            Login now
          </button>

          <div className="register-link">
            Don't have an account? <a href="#">Sign Up</a>
          </div>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
