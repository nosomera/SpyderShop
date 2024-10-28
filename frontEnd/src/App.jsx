import { useState } from 'react'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import FooterComponetn from './components/FooterComponetn'
import styles from "./Styles/ProductList.module.css";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Items from './components/Items';

function App() {


  const [count, setCount] = useState(0)

  return (
    <Router>
        
        <div>
        <header>
          <div className={styles.container}>
            <nav>
              <img src={`http://localhost:8000/storage/images/Designer.jpeg`} style={{ width: "200px", height: "auto" }} alt='No ha cargado el logo' className='logo'/>
              <ul>
                <li className="desplegable">
                  <Link to="/">Lista de Productos</Link>
                </li>
                <li>
                  <Link to="/add-product">Agregar Producto</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add-product" element={<ProductForm />} />
          <Route path="/product/:id" element={<Items />} />
        </Routes>
        <FooterComponetn />
      </div>
    </Router>
  );
};

export default App
