import React from "react";
import Sidebar from "../../components/UI/Sidebar/Sidebar";
import SettingsButton from "../../components/UI/SettingsButton/SettingsButton";
import useDataStock from "../../hooks/usedataStock";
import CategorySection from "../../components/stockPage/CategorySection";
import "./stock.css";

/**
 * Vista principal del inventario, muestra estadísticas y productos por categoría.
 */
const StockPage = () => {
  const {
    categories,
    loading,
    getProductsByCategory,
    totalProducts,
    lowStock,
    outOfStock,
    totalStockValue,
    lowestStock,
  } = useDataStock();

  return (
    <div className="stock-page-container">
      <Sidebar activeItem="STOCK" />
      <div className="stock-main-content">
        <header className="stock-page-header">
          <h1>INVENTORY MANAGEMENT</h1>
          <SettingsButton />
        </header>
        <div className="stock-dashboard-section">
          <h2>DASHBOARD</h2>
          <div className="stock-cards-grid">
            {/* Estadísticas principales */}
            <div className="stock-card">
              <div className="stock-card-title">TOTAL PRODUCTS</div>
              <div className="stock-card-value">{totalProducts}</div>
            </div>
            <div className="stock-card">
              <div className="stock-card-title">LOW STOCK</div>
              <div className="stock-card-value">{lowStock}</div>
            </div>
            <div className="stock-card">
              <div className="stock-card-title">OUT OF STOCK</div>
              <div className="stock-card-value">{outOfStock}</div>
            </div>
            <div className="stock-card">
              <div className="stock-card-title">TOTAL STOCK VALUE</div>
              <div className="stock-card-value">${totalStockValue}</div>
            </div>
            <div className="stock-card">
              <div className="stock-card-title">LOWEST STOCK</div>
              <div className="stock-card-list">
                {lowestStock.map((p) => (
                  <div key={p._id}>{p.name}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Secciones por categoría */}
        <div className="stock-categories-section">
          {categories.map((cat) => (
            <CategorySection
              key={cat._id}
              category={cat}
              products={getProductsByCategory(cat._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockPage;