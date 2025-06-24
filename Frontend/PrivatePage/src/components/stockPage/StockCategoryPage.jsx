import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/UI/Sidebar/Sidebar";
import useDataStock from "../../hooks/usedataStock";
import ProductCard from "../../components/stockPage/ProductCard";
import "../../pages/stockPage/stock.css";

/**
 * Muestra todos los productos de una categoría específica, con debug de datos.
 */
export default function StockCategoryPage() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { categories, getProductsByCategory, loading, products } = useDataStock();

  // Encuentra la categoría por su _id
  const category = categories.find((cat) => String(cat._id) === String(categoryId));
  const filteredProducts = getProductsByCategory(categoryId);

  // --- DEBUG LOGS ---
  console.log("categoryId desde URL:", categoryId);

  console.log("categories:", categories);
  categories.forEach((cat, idx) => {
    console.log(`Categoría[${idx}] _id:`, cat._id, "name:", cat.name);
  });

  console.log("products:", products);
  products.forEach((p, idx) => {
    console.log(`Producto[${idx}] categoryId:`, p.categoryId, "name:", p.name);
  });

  if (products.length > 0) {
    console.log("Ejemplo de producto:", products[0]);
  }
  // --- END DEBUG LOGS ---

  return (
    <div className="stock-page-container">
      <Sidebar activeItem="STOCK" />
      <div className="stock-main-content">
            <button className="stock-back-btn" onClick={() => navigate("/stock")}>← Back</button>
        <header className="stock-page-header">
          <h1>{category?.name || "Categoría"}</h1>
        </header>
        <div className="stock-category-products-all">
          {loading ? (
            <div>Cargando...</div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div>No hay productos en esta categoría.</div>
          )}
        </div>
      </div>
    </div>
  );
}