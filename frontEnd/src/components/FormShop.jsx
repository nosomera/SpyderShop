import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CarContext";
import axios from "axios";

const FormShop = () => {
    const { cartItems, getTotal, clearCart } = useCart();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
       
    
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
    
        if (!userId) {
            alert("No se pudo encontrar el ID de usuario. Por favor, inicie sesión de nuevo.");
            return;
        }
    
        if (!cartItems || cartItems.length === 0) {
            alert("El carrito está vacío. Añade productos antes de continuar.");
            return;
        }
    
        try {
            const response = await axios.post(
                "http://localhost:8000/api/orders",
                {
                    user_id: userId,
                    name, // Incluye el nombre del comprador
                    address,
                    cart: cartItems.map(item => ({
                        product_id: item.product._id,
                        name: item.product.name,
                        price: item.product.price,
                        quantity: item.quantity,
                    })),
                    total: getTotal(),
                },
                {
                    headers: { Authorization: `Bearer ${token}` }, // Añade el token en el header
                }
            );
    
            alert(response.data.message || "Compra procesada con éxito");
            clearCart();
            navigate("/"); // Redirige tras completar la compra
        } catch (error) {
            console.error("Error al procesar la compra:", error);
            alert(
                error.response?.data?.message ||
                "Hubo un problema al procesar la compra. Intenta nuevamente."
            );
        }
        
    };
    

    return (
        <div>
            <h1>Formulario de Compra</h1>
            <form onSubmit={handleSubmit}>
                <label>Nombre del comprador</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                <label>Dirección donde va el pedido</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
                
                <button type="submit">Confirmar Compra</button>
            </form>
        </div>
    );
};

export default FormShop;
