import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import "../styles/styles.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
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

  if (!product) return <p className="text-center">Loading…</p>;

  return (
    <div className="product-detail container">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">${product.price}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
}
