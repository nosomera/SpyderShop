import React, { useEffect, useState } from "react";
import "../Styles/ProductForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rol, setRol] = useState("cliente");

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const movelogin = () => {
    navigate("/login");
  };

  
  const registeractiob = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/users",{
        name,
        address,
        password,
        rol,

      });
      if (response.status==201){
        setSuccess("Registro exitoso");
        navigate("/login");
      }
     
    } catch (error) {
      console.log("ERROR en el registro",error);
      setError("Hubo un problema con el registro")
    }
  };

  return (
    <div id="contenedor">
      <form onSubmit={registeractiob}>
        <h2>Registro</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <div>
          <label htmlFor="address" className="labelU">
            <strong>Ingresa tu correo</strong>
          </label>
          <input
            placeholder="correo@hotmail.com"
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>

          <label htmlFor="address" className="labelU">
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

          <label htmlFor="passwor-confirm" className="labelU">
            <strong>Confrima tu Contraseña</strong>
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
        <a onClick={() => movelogin()}>Iniciar Sesion</a>
      </form>
    </div>
  );
};
export default Register;
