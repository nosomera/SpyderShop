import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Importa useParams
import '../Styles/ItemStyle.css'
import axios from "axios";

const Items = () => {
    const { id } = useParams(); // Obtiene el ID del producto de la URL
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        // Función para obtener los detalles del producto
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/products/${id}`);
                setProduct(response.data); // Guarda el producto en el estado
            } catch (error) {
                console.error("Error al obtener el producto:", error);
                setError("Error al obtener los detalles del producto.");
            }
        };

        fetchProduct();
    }, [id]); // Se ejecuta cada vez que cambia el ID

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!product) {
        return <p>Cargando...</p>;
    }

    return (
        <div id="container">
            <div id="grid">
                <img src={`http://localhost:8000/storage/${product.image}`} alt={`Imagen de ${product.name}`} id="image"/>
                <div id="derecha">
                    <h2>{product.name}</h2>
                    <div id="details">
                        <h3>Precio: ${product.price}</h3>
                        <p>Descripción: {product.description}</p>
                        <label>Cantidad</label>
                        <input type="number" defaultValue={1} min={1} />
                    </div>
                    <button>Añadir al carrito</button>
                </div>
            </div>
        </div>
    );
};

export default Items;
