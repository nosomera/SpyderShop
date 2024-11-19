import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import FooterComponetn from "./components/FooterComponetn";
import Items from "./components/Items";
import ListProducts from "./components/ListProducts";
import EditProduct from "./components/EditProduct";
import CarShop from "./components/CarShop";
import { CartProvider } from "./components/CarContext";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import styles from "./Styles/ProductList.module.css";
import FormShop from "./components/FormShop";
import PrivateRoute from "./components/PrivateRoute ";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Recuperar token y rol al cargar la app
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      setIsAuthenticated(true);
      setUserRole(role);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, []);

  // Cerrar sesión
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setIsAuthenticated(false);
      setUserRole(null);
    }
  };

  return (
    <CartProvider>
      <Router>
        <div>
          <header>
            <div className={styles.container}>
              <nav>
                <img
                  src={`http://localhost:8000/storage/images/Designer.jpeg`}
                  style={{
                    width: "200px",
                    height: "auto",
                    borderRadius: "200px",
                  }}
                  alt="No ha cargado el logo"
                  className="logo"
                />
                <ul>
                  <li className="desplegable">
                    <Link to="/">Lista de Productos</Link>
                  </li>
                  {isAuthenticated && userRole === "admin" && (
                    <li>
                      <Link to="/product/lista">Ver productos</Link>
                    </li>
                  )}
                  <li>
                    <Link to="/carshop">Carrito de compras</Link>
                  </li>
                  <li>
                    {isAuthenticated ? (
                      <li onClick={handleLogout} style={{ cursor: "pointer" }}>
                        <Link to="/">Logout</Link>
                      </li>
                    ) : (
                      <Link to="/login">Login</Link>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <Routes>
            <Route path="/" element={<ProductList />} />

            <Route
              path="/add-product"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  allowedRoles={["admin"]}
                  userRole={userRole}
                >
                  <ProductForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-product/:id"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  allowedRoles={["admin"]}
                  userRole={userRole}
                >
                  <EditProduct />
                </PrivateRoute>
              }
            />

            <Route path="/product/:id" element={<Items />} />

            <Route
              path="/product/lista"
              element={
                <PrivateRoute
                  isAuthenticated={isAuthenticated}
                  allowedRoles={["admin"]}
                  userRole={userRole}
                >
                  <ListProducts />
                </PrivateRoute>
              }
            />

            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route
              path="/carshop"
              element={<CarShop isAuthenticated={isAuthenticated} />}
            />
            <Route path="/formulario-compra" element={<FormShop />} />
            <Route
              path="/login"
              element={
                <Login
                  setIsAuthenticated={setIsAuthenticated}
                  setUserRole={setUserRole}
                />
              }
            />
            <Route path="/register" element={<Register />} />
          </Routes>

          <FooterComponetn />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
