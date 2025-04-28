import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

export default function ProductCard({ product }) {
  const nav = useNavigate();
  
  return (
    <div className="product-card" onClick={() => nav(`/product/${product.id}`)}>
      <img src={product.image} alt={product.name} className="product-image"/>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </div>
  );
}
