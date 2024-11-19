    import { useState, useEffect } from "react";
    import "../Styles/OrdenList.css"

    function OrdenList() {
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para mostrar cargando
    const [error, setError] = useState(null); // Estado para manejar errores

    useEffect(() => {
        fetch("http://localhost:8000/api/ordenes")
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
            setError(error.message);
            setLoading(false);
        });
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
        <h1>Lista de Órdenes</h1>
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

    export default OrdenList;
