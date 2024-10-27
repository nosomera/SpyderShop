import { useState } from 'react'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'


import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li className='navigator'>
              <Link to="/">Lista de Productos</Link>
            </li>
            <li>
              <Link to="/add-product">Agregar Producto</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add-product" element={<ProductForm />} />
        </Routes>
        <FooterComponent />
      </div>
    </Router>
  );
};

export default App
