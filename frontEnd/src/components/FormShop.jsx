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

        // Obtener el token y userId desde localStorage
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        // Verificar si existe un userId
        if (!userId) {
            alert("No se pudo encontrar el ID de usuario. Por favor, inicie sesión de nuevo.");
            return;
        }

        // Verificar si el carrito tiene productos
        if (!cartItems || cartItems.length === 0) {
            alert("El carrito está vacío. Añade productos antes de continuar.");
            return;
        }

        try {
            // Hacer la solicitud POST para crear la orden
            const response = await axios.post(
                "http://localhost:8000/api/orders", // Asegúrate de que la URL sea correcta
                {
                    user_id: userId, // El ID de usuario
                    name, // Nombre del comprador
                    address, // Dirección del comprador
                    cart: cartItems.map(item => ({
                        product_id: item.product._id,
                        name: item.product.name,
                        price: item.product.price,
                        quantity: item.quantity,
                    })),
                    total: getTotal(), // Total de la compra
                },
                {
                    headers: { Authorization: `Bearer ${token}` }, // Token de autorización
                }
            );

            // Notificar al usuario si la compra fue exitosa
            alert(response.data.message || "Compra procesada con éxito");

            // Limpiar el carrito y redirigir al usuario
            clearCart();
            navigate("/"); // Redirigir tras completar la compra
        } catch (error) {
            console.error("Error al procesar la compra:", error);

            // Mostrar mensaje de error si algo falla
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
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label>Dirección donde va el pedido</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                
                <button type="submit">Confirmar Compra</button>
            </form>
        </div>
    );
};

export default FormShop;
