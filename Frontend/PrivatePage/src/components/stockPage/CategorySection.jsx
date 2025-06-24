import React from "react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

/**
 * Sección de productos de una categoría con botón "SEE ALL".
 */
export default function CategorySection({ category, products }) {
  const navigate = useNavigate();

  return (
    <section className="stock-category-section">
      <div className="stock-category-header">
        <h3>{category.name}</h3>
        <button
          className="stock-see-all-btn"
          onClick={() => navigate(`/stock/category/${category._id}`)}
        >
          SEE ALL
        </button>
      </div>
      <div className="stock-category-products">
        {products.slice(0, 3).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}