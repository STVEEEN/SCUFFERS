// src/pages/viewOfProductPage/ViewOfProduct.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import "./viewOfProduct.css";

const SIZES = ["XS", "S", "M", "L", "XL"];

const ViewOfProduct = () => {
  const navigate = useNavigate();
  const { state: product } = useLocation();
  const [selectedSize, setSelectedSize] = useState(null);

  // Redirige si no viene producto
  useEffect(() => {
    if (!product) navigate("/products", { replace: true });
  }, [product, navigate]);

  if (!product) return <p className="loading">Cargando producto…</p>;

  return (
    <div className="viewOfProduct">
      <Navbar />
      <div className="main-content-viewOfProduct">
        <Sidebar />

        <div className="product-detail">
          {/* IMAGEN */}  
          <div className="image-slider">
            <span className="arrow left">&#8249;</span>
            <img src={product.image} alt={product.topText} />
            <span className="arrow right">&#8250;</span>
          </div>

          {/* DETALLE */}  
          <div className="product-info">
            <h1 className="product-title">{product.topText}</h1>
            <p className="product-price">{product.bottomText}</p>
            <p className="product-sub">
              * Taxes & shipping calculated at checkout
            </p>

            {/* TALLAS */}  
            <div className="size-selector">
              <span className="size-label">SIZE</span>
              <div className="sizes">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    className={
                      size === selectedSize ? "size-btn active" : "size-btn"
                    }
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <a href="#" className="size-guide">
                Size Guide Chart
              </a>
            </div>

            {/* BOTONES */}  
            <div className="action-buttons">
              <button className="btn add-bag">ADD TO SHOPPING BAG</button>
              <button className="btn add-wish">ADD TO WISHLIST</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOfProduct;
