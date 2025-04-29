import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import "../styles/styles.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(""); // Estado para la talla seleccionada
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get("/src/data/products.json")
      .then((res) => {
        const p = res.data.find((item) => item.id === parseInt(id, 10));
        if (!p) console.error("Producto no encontrado");
        setProduct(p);
      })
      .catch((err) => console.error("Error al cargar producto:", err));
  }, [id]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor, selecciona una talla antes de agregar al carrito.");
      return;
    }
    addToCart({ ...product, size: selectedSize }); // Agregar producto con talla seleccionada
  };
  <div/>

  if (!product) return <p className="text-center">Loading…</p>;

  return (
    <div className="product-detail container">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">${product.price}</p>
        <div className="size-buttons">
          {["XS", "S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              className={`size-button ${selectedSize === size ? "selected" : ""}`}
              onClick={() => handleSizeSelect(size)}
            >
              {size}
            </button>
          ))}
        </div>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}
