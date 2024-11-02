import React, { useEffect, useState } from "react";
import '../Styles/ProductForm.css'
import { useNavigate } from "react-router-dom"; 
import axios from "axios";


const Login =()=>{
    const navigate = useNavigate();
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const loging= async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:8000/api/login",{
                address,
                password,
            });
            if (response.status ===201){
                navigate("/");
            }

        }catch (error){
            setError("Credenciales incorrectas. Inténtalo nuevamente.");
            console.error("Error de inicio de sesión", err);
        }
    }
    
  const move = () => {
    navigate("/register");
    
  };
    return(
        <div  id="contenedor">
            <form onSubmit={loging}>

            <h2>Inicio de Sesion</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
                <label htmlFor="address" 
                className="labelU"
                ><strong>Correo</strong></label>
                <input
            placeholder="correo@hotmail.com"
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
                <label htmlFor="password"
                className="labelU">
                    <strong>
                    Contraseña
                    </strong>
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
            <a  onClick={() => move()}>No tienes cuenta?</a>
            </form>
        </div>
    )
}
export default Login;