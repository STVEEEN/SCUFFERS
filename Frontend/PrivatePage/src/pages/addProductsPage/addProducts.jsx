import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import SettingsButton from "../../components/SettingsButton/SettingsButton"; // Botón de configuración
import "./AddProducts.css";

const AddProduct = () => {
  const [garmentName, setGarmentName] = useState("");
  const [description, setDescription] = "";
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [collection, setCollection] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleAddProduct = () => {
    console.log("Product added:", { garmentName, description, category, price, collection, imageUrl });
  };

  return (
    <div className="add-product-page">
      <Sidebar /> {/* Sidebar intacto */}

      <div className="add-product-container">
        {/* Encabezado con título y botón de configuración */}
        <div className="header">
          <h2>ADD THE PRODUCT</h2>
          <SettingsButton /> {/* Botón de configuración */}
        </div>

        {/* Contenedor principal con formulario e imagen */}
        <div className="content">
          {/* Sección izquierda: Inputs principales */}
          <div className="form-section">
            <input type="text" placeholder="GARMENT NAME" value={garmentName} onChange={(e) => setGarmentName(e.target.value)} />
            <input type="text" placeholder="DESCRIPTION" value={description} onChange={(e) => setDescription(e.target.value)} />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">CATEGORY</option>
            </select>
            <input type="text" placeholder="PRICE" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input type="text" placeholder="COLLECTION" value={collection} onChange={(e) => setCollection(e.target.value)} />
          </div>

          {/* Sección derecha: Imagen previa y URL alineadas a la par */}
          <div className="image-section">
            <div className="image-preview">
              <p>IMAGE PREVIEW</p>
            </div>
            <input type="text" placeholder="IMAGE URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </div>
        </div>

        {/* Botón ADD centrado y más corto */}
        <div className="button-container">
          <button type="button" onClick={handleAddProduct}>ADD</button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
