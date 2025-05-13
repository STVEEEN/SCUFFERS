import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar"; // Importa el componente de la barra lateral
import SettingsButton from "../../components/SettingsButton/SettingsButton"; // Importa el botón de configuración
import "./addProducts.css"; // Importa los estilos CSS

const AddProduct = () => {
  // Estados para almacenar los datos del producto
  const [garmentName, setGarmentName] = useState(""); // Nombre de la prenda
  const [description, setDescription] = useState(""); // Descripción del producto
  const [category, setCategory] = useState(""); // Categoría del producto
  const [price, setPrice] = useState(""); // Precio del producto
  const [collection, setCollection] = useState(""); // Colección a la que pertenece
  const [imageUrl, setImageUrl] = useState(""); // URL de la imagen del producto

  // Función para manejar la acción de agregar un producto
  const handleAddProduct = () => {
    console.log("Product added:", { garmentName, description, category, price, collection, imageUrl });
  };

  return (
    <div className="AddProduct-page"> {/* Contenedor principal de la página */}
      <Sidebar /> {/* Barra lateral */}

      <div className="AddProduct-container"> {/* Contenedor del formulario */}
        <div className="AddProduct-header"> {/* Encabezado con título y botón de configuración */}
          <h2>ADD THE PRODUCT</h2>
          <SettingsButton /> {/* Botón de configuración */}
        </div>

        <div className="AddProduct-content"> {/* Contenedor del formulario y la imagen */}
          <div className="AddProduct-form-section"> {/* Sección del formulario */}
            {/* Campo para el nombre de la prenda */}
            <input 
              type="text" 
              placeholder="GARMENT NAME" 
              value={garmentName} 
              onChange={(e) => setGarmentName(e.target.value)} 
            />

            {/* Campo para la descripción */}
            <input 
              type="text" 
              placeholder="DESCRIPTION" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
            />

            {/* Selector de categoría */}
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">CATEGORY</option>
            </select>

            {/* Campo para el precio */}
            <input 
              type="text" 
              placeholder="PRICE" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
            />

            {/* Campo para la colección */}
            <input 
              type="text" 
              placeholder="COLLECTION" 
              value={collection} 
              onChange={(e) => setCollection(e.target.value)} 
            />
          </div>

          <div className="AddProduct-image-section"> {/* Sección de la imagen */}
            <div className="AddProduct-image-preview"> {/* Vista previa de la imagen */}
              <p>IMAGE PREVIEW</p>
            </div>

            {/* Campo para la URL de la imagen */}
            <input 
              type="text" 
              placeholder="IMAGE URL" 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)} 
            />
          </div>
        </div>

        <div className="AddProduct-button-container"> {/* Contenedor del botón */}
          <button 
            className="AddProduct-button" 
            type="button" 
            onClick={handleAddProduct}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
