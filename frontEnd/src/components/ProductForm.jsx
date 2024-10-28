import React, { useState } from "react";
import axios from "axios";
import '../Styles/ProductForm.css'

const ProductForm = () => {
  const [name, setName] = useState("");
  const [count, setCount] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // Nuevo estado para manejar el mensaje de éxito

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Almacena el archivo de imagen
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Primero, subimos la imagen
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile); // Agrega el archivo de imagen al FormData

      try {
        const response = await axios.post("http://localhost:8000/api/products/upload", formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Asegúrate de establecer el tipo de contenido
          },
        });
        setImagePath(response.data.path); // Guarda la ruta de la imagen

        // Ahora, podemos guardar el producto
        await axios.post("http://localhost:8000/api/products", {
          name,
          count: parseInt(count),
          price: parseFloat(price),
          description,
          image: response.data.path, // Guarda la ruta de la imagen en el producto
        });

        // Restablece los campos del formulario
        setName("");
        setCount("");
        setPrice("");
        setDescription("");
        setImageFile(null);
        setImagePath("");
        setError(null);
        setSuccess("Producto agregado exitosamente."); // Mensaje de éxito
      } catch (error) {
        console.error(error);
        setError("Error al agregar el producto.");
        setSuccess(null); // Limpia el mensaje de éxito si hay un error
      }
    } else {
      setError("Por favor selecciona una imagen.");
      setSuccess(null); // Limpia el mensaje de éxito si hay un error
    }
  };

  return (
    <div id="contenedor">
      <h1>Agregar Producto</h1>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>} {/* Mensaje de éxito */}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">Nombre</label>
          <input
            type="text"
            id="productName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="productCount">Cantidad</label>
          <input
            type="number"
            id="productCount"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="productPrice">Precio</label>
          <input
            type="number"
            id="productPrice"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="productDescription">Descripción</label>
          <input
            type="text"
            id="productDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="productImage">Imagen</label>
          <input
            type="file"
            id="productImage"
            accept="image/*" // Solo permite imágenes
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
};

export default ProductForm;
