import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/ItemStyle.css";
import axios from "axios";
import { useCart } from "../components/CarContext";

const Items = () => {
  const { id } = useParams(); // Obtiene el ID del producto de la URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Función para obtener los detalles del producto
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${id}`
        );
        setProduct(response.data); // Guarda el producto en el estado
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        setError("Error al obtener los detalles del producto.");
      }
    };

    fetchProduct();
  }, [id]); // Se ejecuta cada vez que cambia el ID

  const handleAddToCart = () => {
    addToCart(product, quantity); // Agrega el producto al carrito
    navigate("/carshop");
  };

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!product) {
    return <p>Cargando...</p>;
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
    <div id="container">
      <div id="grid">
        <img
          src={`http://localhost:8000/storage/${product.image}`}
          alt={`Imagen de ${product.name}`}
          id="image"
        />
        <div id="derecha">
          <h2>{product.name}</h2>
          <div id="details">
          <h3>Precio: {formatCurrency(product.price)}</h3>
            <p>Descripción: {product.description}</p>
            <label>Cantidad</label>
            <input
              type="number"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <button onClick={handleAddToCart}>Añadir al carrito</button>
        </div>
      </div>
    </div>
  );
};

export default Items;
