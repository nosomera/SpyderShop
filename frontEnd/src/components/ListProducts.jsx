import React, { useEffect, useState } from "react";
import styles from "../Styles/ProductList.module.css";
import { useNavigate } from "react-router-dom";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Hacer una petición GET a la API para obtener la lista de productos
    fetch("http://localhost:8000/api/products") // Ajusta la URL según tu configuración
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error al cargar los productos:", error));
  }, []);

  const handleViewProduct = (id) => {
    const stringId = id.$oid;
    console.log("Product ID:", stringId);
    navigate(`/product/${stringId}`);
  };

  
  const editProduct = (id) => {
    const stringId = id.$oid;
    console.log("Product ID:", stringId);
    navigate(`/edit-product/${stringId}`);
  };


  const addProducts = () => {
    navigate("/add-product");
  };
  return (
    <div>
      <div className={styles.tableContainer}>
        <div>
          <table>
            <thead>
            <tr>
              <td>
                <h1>Lista de productos</h1>
              </td>
            </tr>
            <tr>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Descripcion</th>
              <th>Accion</th>
            </tr>
            </thead>
            <tbody>

           
            {products.map((product, index) => (
              <tr>
                <td><img
                src={`http://localhost:8000/storage/${product.image}`}
                alt={product.name}
                style={{ width: "60px", height: "auto" }}
              /></td>
                <td>{product.name}</td>
                <td>{product.count}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>
                  <button
                    onClick={() => editProduct(product._id)}
                    className={styles.editButton}
                  >
                    Editar Producto
                  </button>
                </td>
              </tr>
            ))}
            <button
              onClick={() => addProducts()}
              className={styles.productButton}
            >
              Añadir Producto
            </button>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListProducts;
