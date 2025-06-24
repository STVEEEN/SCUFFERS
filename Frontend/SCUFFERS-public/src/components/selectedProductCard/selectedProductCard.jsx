// src/components/selectedProductCard/SelectedProductCard.jsx
import React from "react";
import "./SelectedProductCard.css";

const SelectedProductCard = ({ product, onRemove, onQuantityChange }) => {
  const quantity = product.quantity ?? 1;

  return (
    <div className="selected-product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.topText}
          className="selected-product-img"
        />
      </div>

      <div className="selected-product-info">
        <h3 className="selected-product-title">{product.topText}</h3>
        <p className="selected-product-price">{product.bottomText}</p>
        
        <div className="size-quantity-container">
          <p className="selected-product-size">
            Size: {product.selectedSize} 
          </p>
          
          <div className="quantity-controls">
            <button 
              className="quantity-btn"
              onClick={() => onQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="quantity-value">{quantity}</span>
            <button 
              className="quantity-btn"
              onClick={() => onQuantityChange(1)}
            >
              +
            </button>
          </div>
        </div>

        <button className="selected-remove-btn" onClick={onRemove}>
          REMOVE
        </button>
      </div>
    </div>
  );
};

export default SelectedProductCard;