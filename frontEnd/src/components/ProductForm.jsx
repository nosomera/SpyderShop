import React, { useState } from "react";
import axios from "axios";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [count, setCount] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const [error, setError] = useState(null);

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
      } catch (error) {
        console.error(error);
        setError("Error al agregar el producto.");
      }
    } else {
      setError("Por favor selecciona una imagen.");
    }
  };

  return (
    <div>
      <h1>Agregar Producto</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cantidad</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Precio</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descripción</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Imagen</label>
          <input
            type="file"
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
