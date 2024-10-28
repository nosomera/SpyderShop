import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Importa useParams
import axios from "axios";
import "../Styles/ProductForm.css";

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [count, setCount] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Función para obtener los detalles del producto
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/products/${id}`
        );
        setProduct(response.data);
        setName(response.data.name);
        setCount(response.data.count);
        setPrice(response.data.price);
        setDescription(response.data.description);
        setImagePath(response.data.image);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        setError("Error al obtener los detalles del producto.");
      }
    };

    fetchProduct();
  }, [id]); // Se ejecuta cada vez que cambia el ID

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      try {
        const response = await axios.post(
          "http://localhost:8000/api/products/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setImagePath(response.data.path); // Actualiza la ruta de la imagen
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        setError("Error al subir la imagen.");
        return;
      }
    }

    try {
      await axios.put(`http://localhost:8000/api/products/${id}`, {
        name,
        count: parseInt(count),
        price: parseFloat(price),
        description,
        image: imagePath, // Utiliza la ruta de la imagen actualizada
      });

      setSuccess("Producto actualizado con éxito.");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      setError("Error al actualizar el producto.");
    }
  };

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!product) {
    return <p>Cargando...</p>;
  }
  return(
  <div>
    <h1>Editar Producto</h1>
    {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}<form onSubmit={handleSubmit}>
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
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit">Actualizar Producto</button>
            </form>
        </div>
    );
};

export default EditProduct;
