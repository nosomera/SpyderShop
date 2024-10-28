import { useState } from 'react'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import FooterComponetn from './components/FooterComponetn'
import styles from "./Styles/ProductList.module.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Items from './components/Items';
import ListProducts from './components/ListProducts';
import EditProduct from './components/EditProduct';
import CarShop from './components/CarShop';
import { CartProvider } from './components/CarContext';

function App() {


  const [count, setCount] = useState(0)

  return (
    <CartProvider>

    <Router>
        
        <div>
        <header>
          <div className={styles.container}>
            <nav>
              <img src={`http://localhost:8000/storage/images/Designer.jpeg`} style={{ width: "200px", height: "auto" , borderRadius:"200px"}} alt='No ha cargado el logo' className='logo'/>
              <ul>
                <li className="desplegable">
                  <Link to="/">Lista de Productos</Link>
                </li>
                <li>
                  <Link to="/product/lista">Ver productos</Link>
                </li>
                <li>
                <Link to="/carshop">Carrito de compras</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add-product" element={<ProductForm />} />
          <Route path="/product/:id" element={<Items />} />
          <Route path="/product/lista" element={<ListProducts />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/carshop" element={<CarShop />} />
        </Routes>
        <FooterComponetn />
      </div>
    </Router>
    </CartProvider>
  );
};

export default App
