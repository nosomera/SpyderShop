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

function App() {


  const [count, setCount] = useState(0)

  return (
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
        </Routes>
        <FooterComponetn />
      </div>
    </Router>
  );
};

export default App
