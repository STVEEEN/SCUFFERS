import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Card UI/UX para mostrar producto individual en stock.
 */
export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const totalStock = product.variants?.reduce((acc, v) => acc + Number(v.stock || 0), 0);

  return (
    <div className="stock-prod-card">
      <img src={product.image} alt={product.name} className="stock-prod-img" />
      <div className="stock-prod-info">
        <div className="stock-prod-title">{product.name}</div>
        <div className="stock-prod-row">
          <span className="stock-prod-price">${product.price}</span>
          <span className="stock-prod-stock">Stock: {totalStock}</span>
        </div>
        <div className="stock-prod-variants">
          <b>Tallas:</b>{" "}
          {product.variants?.map((v, i) => (
            <span key={i}>{v.size}({v.stock}) </span>
          ))}
        </div>
        <button
          className="stock-prod-edit-btn"
          onClick={() => navigate(`/addProducts?id=${product._id}`)}
        >
          Editar
        </button>
      </div>
    </div>
  );
}