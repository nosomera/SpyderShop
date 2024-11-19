import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/ProductForm.css";

const Login = ({ setIsAuthenticated, setUserRole }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const loging = async (e) => {
    e.preventDefault();
    setError(null); // Reset error
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      if (response.status === 200) {
        // Guardar token y rol en localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("userId", response.data.userId);
       

        // Actualizar estados globales
        setIsAuthenticated(true);
        setUserRole(response.data.role);

        // Navegar al inicio
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Ocurrió un error. Inténtalo nuevamente.");
    }
  };

  return (
    <div id="contenedor">
      <form onSubmit={loging}>
        <h2>Inicio de Sesión</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <label htmlFor="email" className="labelU">
            <strong>Correo</strong>
          </label>
          <input
            placeholder="correo@hotmail.com"
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password" className="labelU">
            <strong>Contraseña</strong>
          </label>
          <input
            placeholder="PASSWORD"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </div>
        <a onClick={() => navigate("/register")} style={{ cursor: "pointer" }}>
          ¿No tienes cuenta?
        </a>
      </form>
    </div>
  );
};

export default Login;
