import React, { useEffect, useState } from "react";
import styles from "../Styles/ProductList.module.css";
import { useNavigate } from "react-router-dom"; // Asegúrate de importar useNavigate

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    // Hacer una petición GET a la API para obtener la lista de productos
    fetch("http://localhost:8000/api/products") // Ajusta la URL según tu configuración
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error al cargar los productos:", error));
  }, []);

  const handleViewProduct = (id) => {
    const stringId = id.$oid; // Accede al campo "$oid" del objeto ID
    console.log("Product ID:", stringId); // Verifica el ID convertido
    navigate(`/product/${stringId}`); // Redirige a la página del producto usando su ID como string
};


  return (
    <div>
      <div className={styles.productList}>
        <ul className={styles.productCard}>
          {products.map((product, index) => (
            <li key={index}>
              <h2>{product.name}</h2>
              <p>Descripción: {product.description}</p>
              <p>Precio: ${product.price}</p>
              <img
                src={`http://localhost:8000/storage/${product.image}`}
                alt={product.name}
                style={{ width: "200px", height: "auto" }}
              />
              <div>
                <button
                  onClick={() => handleViewProduct(product._id)} 
                  className={styles.productButton}
                >
                  Ver Producto
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
