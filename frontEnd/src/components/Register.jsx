import React, { useState } from "react";
import "../Styles/ProductForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("viewer");

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const movelogin = () => {
    navigate("/login");
  };

  const registerAction = async (e) => {
    e.preventDefault();

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        name,
        email,  // Asegúrate de enviar 'email' en lugar de 'address'
        password,
        password_confirmation: confirmPassword, 
        role,
      });

      if (response.status === 201) {
        setSuccess("Registro exitoso");
        navigate("/login");
      }
    } catch (error) {
      console.log("ERROR en el registro", error);
      setError("Hubo un problema con el registro");
    }
  };

  return (
    <div id="contenedor">
      <form onSubmit={registerAction}>
        <h2>Registro</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        
        <div>
          <label htmlFor="email" className="labelU">
            <strong>Ingresa tu correo</strong>
          </label>
          <input
            placeholder="correo@hotmail.com"
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="name" className="labelU">
            <strong>Ingresa tu nombre</strong>
          </label>
          <input
            placeholder="Nombre"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="password" className="labelU">
            <strong>Contraseña</strong>
          </label>
          <input
            placeholder="Contraseña"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label htmlFor="confirm-password" className="labelU">
            <strong>Confirma tu Contraseña</strong>
          </label>
          <input
            placeholder="Confirmar contraseña"
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Registrarse</button>
        </div>
        <a onClick={() => movelogin()}>Iniciar Sesión</a>
      </form>
    </div>
  );
};

export default Register;
