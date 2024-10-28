import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useCart} from '../components/CarContext';
import styles from "../Styles/ProductList.module.css";

const CarShop =()=>{
    const { cartItems, clearCart, getTotal } = useCart();
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
                            <td>subtotal</td>
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
                                    <td>${item.product.price.toFixed(2)}</td>
                                    <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))
                        )}
                        <tr>
                            <td colSpan="3"><strong>Total:</strong></td>
                            <td>${getTotal().toFixed(2)}</td>
                        </tr>
                    </tbody>
                    <button onClick={clearCart}className={styles.productButton}>Vaciar Carrito</button>
                </table>
                
                <button>Comprar</button>
            </div>
        </div>
    );
};
export default CarShop;