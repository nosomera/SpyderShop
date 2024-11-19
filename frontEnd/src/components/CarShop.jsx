import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CarContext";
import styles from "../Styles/ProductList.module.css";
import axios from "axios";

const CarShop = ({ isAuthenticated }) => {
  const { cartItems, clearCart, getTotal } = useCart();
  const navigate = useNavigate();

  

  const handlePurchase = () => {
    if (!isAuthenticated) {
      // Si no está autenticado, redirigir al login
      alert("Primero debes iniciar sesión");
      navigate("/login");
      return;
    }

    // Si está autenticado, redirigir al formulario de compra
    navigate("/formulario-compra");
  };

    
const formatCurrency = (value) => {
  if (!value) return "";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0
  }).format(value);
};


  return (
    <div>
      <h1>Carrito de compras</h1>
      <div>
        <table>
          <thead>
            <tr>
              <td>Producto</td>
              <td>Cantidad</td>
              <td>Precio</td>
              <td>Subtotal</td>
            </tr>
          </thead>
          <tbody>
            {cartItems.length === 0 ? (
              <tr>
                <td colSpan="4">El carrito está vacío</td>
              </tr>
            ) : (
              cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.product.name}</td>
                  <td>{item.quantity}</td>
                  <td>{formatCurrency(item.product.price.toFixed(2))}</td>
                  <td>${(item.product.price * item.quantity).toFixed(0)}</td>
                </tr>
              ))
            )}
            <tr>
              <td colSpan="3">
                <strong>Total:</strong>
              </td>

              <td>{formatCurrency(getTotal().toFixed(2))}</td>
            
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <button onClick={clearCart} className={styles.productButton}>
                  Vaciar Carrito
                </button>
              </td>
              <td>
                <button onClick={handlePurchase} className={styles.productButton}>
                  Comprar
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default CarShop;
