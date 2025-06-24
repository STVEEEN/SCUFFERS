import React from "react";
import "./productCard.css";

const ProductCard = ({ image, topText, bottomText, onClick }) => (
  <div className="product-card" onClick={onClick}>
    <div className="product-card-image-container">
      <img src={image} alt={topText} className="product-card-image" />
    </div>
    <div className="product-card-info">
      <div className="product-card-title">{topText}</div>
      <div className="product-card-price">{bottomText}</div>
    </div>
  </div>
);

export default ProductCard;