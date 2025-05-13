import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import SettingsButton from "../../components/SettingsButton/SettingsButton";
import "./addProducts.css";

const AddProduct = () => {
  const [garmentName, setGarmentName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [collection, setCollection] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleAddProduct = () => {
    console.log("Product added:", { garmentName, description, category, price, collection, imageUrl });
  };

  return (
    <div className="AddProduct-page">
      <Sidebar /> 

      <div className="AddProduct-container">
        <div className="AddProduct-header">
          <h2>ADD THE PRODUCT</h2>
          <SettingsButton />
        </div>

        <div className="AddProduct-content">
          <div className="AddProduct-form-section">
            <input type="text" placeholder="GARMENT NAME" value={garmentName} onChange={(e) => setGarmentName(e.target.value)} />
            <input type="text" placeholder="DESCRIPTION" value={description} onChange={(e) => setDescription(e.target.value)} />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">CATEGORY</option>
            </select>
            <input type="text" placeholder="PRICE" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input type="text" placeholder="COLLECTION" value={collection} onChange={(e) => setCollection(e.target.value)} />
          </div>

          <div className="AddProduct-image-section">
            <div className="AddProduct-image-preview">
              <p>IMAGE PREVIEW</p>
            </div>
            <input type="text" placeholder="IMAGE URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </div>
        </div>

        <div className="AddProduct-button-container">
          <button className="AddProduct-button" type="button" onClick={handleAddProduct}>ADD</button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
