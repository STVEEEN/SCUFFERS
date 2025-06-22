import React, { useState } from "react";
import "./ProductsCard.css";

const ProductsCard = ({ product, onEdit, onDelete }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");

  const images = (product.images && product.images[selectedColor]) || [];

  const nextImg = () => setImgIndex((prev) => (prev + 1) % images.length);
  const prevImg = () => setImgIndex((prev) => (prev - 1 + images.length) % images.length);

  // Cambia el color y reinicia el índice de imagen
  const handleColorChange = (color) => {
    setSelectedColor(color);
    setImgIndex(0);
  };

  return (
    <div className="product-card">
      <div className="product-card-carousel">
        {images.length > 0 ? (
          <>
            <img
              src={images[imgIndex]}
              alt={product.garmentName}
              className="product-card-img"
            />
            {images.length > 1 && (
              <>
                <button className="carousel-btn left" onClick={prevImg}>&lt;</button>
                <button className="carousel-btn right" onClick={nextImg}>&gt;</button>
              </>
            )}
          </>
        ) : (
          <div className="product-card-img-placeholder">No Image</div>
        )}
      </div>
      {/* Selector de color */}
      {product.colors && product.colors.length > 1 && (
        <div className="product-card-colors">
          {product.colors.map((color) => (
            <span
              key={color}
              className={`color-dot${color === selectedColor ? " selected" : ""}`}
              style={{ background: color }}
              title={color}
              onClick={() => handleColorChange(color)}
            />
          ))}
        </div>
      )}
      <h4>{product.garmentName}</h4>
      <p>{product.description}</p>
      <p><b>Category:</b> {product.category}</p>
      <p><b>Price:</b> ${product.price}</p>
      <p><b>Collection:</b> {product.collection}</p>
      <div>
        <button
          className="btn btn-sm btn-warning"
          style={{ backgroundColor: "#000", color: "#fff", marginRight: 6, borderRadius: "0.75rem" }}
          onClick={() => onEdit(product)}
        >
          Edit
        </button>
        <button
          className="btn btn-sm btn-danger"
          style={{ backgroundColor: "#000", color: "#fff", borderRadius: "0.75rem", marginLeft: 6 }}
          onClick={() => onDelete(product._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductsCard;