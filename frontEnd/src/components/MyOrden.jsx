import { useState, useEffect } from "react";
import "../Styles/OrdenList.css";

function MyOrden() {
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (userId) {
            fetch(`http://localhost:8000/api/ordenes/${userId}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Error al obtener las órdenes.");
                    }
                    return response.json();
                })
                .then((data) => {
                    setOrdenes(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error al cargar las órdenes:", error);
                    setError("No se pudieron cargar las órdenes. Intenta nuevamente más tarde.");
                    setLoading(false);
                });
        } else {
            setError("No se encontró el ID de usuario. Por favor, inicie sesión.");
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <p className="loading-message">Cargando órdenes...</p>;
    }

    if (error) {
        return <p className="message">Error: {error}</p>;
    }

     
const formatCurrency = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0
    }).format(value);
  };
  

    return (
        <div className="orden-list-container">
            <h1>Mis Órdenes</h1>
            {ordenes.length > 0 ? (
                ordenes.map((orden, index) => (
                    <div key={index} className="orden-item">
                        <p><strong>Nombre:</strong> {orden.name}</p>
                        <p><strong>Dirección:</strong> {orden.address}</p>
                        <p><strong>Status:</strong> {orden.status}</p>
                        <p><strong>Total:</strong> {formatCurrency(orden.total)}</p>
                        <p><strong>Fecha de creación:</strong> {new Date(orden.created_at).toLocaleString()}</p>
                      
                        <div>
                            <strong>Carrito:</strong>
                            <ul className="cart-list">
                                {orden.cart.map((item, i) => (
                                    <li key={i}>
                                        <span>{item.name}</span> - {item.quantity} x {formatCurrency(item.price)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hay órdenes registradas.</p>
            )}
        </div>
    );
}

export default MyOrden;
