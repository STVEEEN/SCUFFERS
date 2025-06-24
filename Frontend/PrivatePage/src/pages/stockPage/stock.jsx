import React, { useEffect } from "react";
import Sidebar from "../../components/UI/Sidebar/Sidebar";
import SettingsButton from "../../components/UI/SettingsButton/SettingsButton";
import useDataStock from "../../hooks/usedataStock";
import CategorySection from "../../components/stockPage/CategorySection";
import Swal from "sweetalert2";
import "./stock.css";

/**
 * Vista principal del inventario. Muestra estadísticas del inventario
 * (como total de productos, bajo stock, sin stock, etc.)
 * y los productos agrupados por categoría.
 */
const StockPage = () => {
  const {
    categories,         // Lista de categorías disponibles
    loading,            // Estado de carga de datos
    getProductsByCategory, // Función para obtener productos por categoría
    totalProducts,      // Número total de productos
    lowStock,           // Número de productos con stock bajo
    outOfStock,         // Número de productos sin stock
    totalStockValue,    // Valor total del inventario
    lowestStock,        // Lista de productos con el menor stock
  } = useDataStock();

  // Efecto para mostrar alertas si hay problemas con el inventario
  useEffect(() => {
    if (!loading && totalProducts === 0) {
      Swal.fire({
        title: "Inventario vacío",
        text: "No hay productos registrados en el sistema.",
        icon: "info",
        confirmButtonColor: "#3085d6",
      });
    }

    if (!loading && categories.length === 0) {
      Swal.fire({
        title: "Sin categorías",
        text: "No se encontraron categorías de productos.",
        icon: "warning",
        confirmButtonColor: "#d33",
      });
    }
  }, [loading, totalProducts, categories]);

  return (
    <div className="stock-page-container">
      {/* Barra lateral con navegación activa en "STOCK" */}
      <Sidebar activeItem="STOCK" />

      <div className="stock-main-content">
        {/* Encabezado de la página */}
        <header className="stock-page-header">
          <h1>INVENTORY MANAGEMENT</h1>
          <SettingsButton />
        </header>

        {/* Sección del dashboard con estadísticas clave */}
        <div className="stock-dashboard-section">
          <h2>DASHBOARD</h2>
          <div className="stock-cards-grid">
            {/* Tarjeta: Total de productos */}
            <div className="stock-card">
              <div className="stock-card-title">TOTAL PRODUCTS</div>
              <div className="stock-card-value">{totalProducts}</div>
            </div>

            {/* Tarjeta: Bajo stock */}
            <div className="stock-card">
              <div className="stock-card-title">LOW STOCK</div>
              <div className="stock-card-value">{lowStock}</div>
            </div>

            {/* Tarjeta: Sin stock */}
            <div className="stock-card">
              <div className="stock-card-title">OUT OF STOCK</div>
              <div className="stock-card-value">{outOfStock}</div>
            </div>

            {/* Tarjeta: Valor total del inventario */}
            <div className="stock-card">
              <div className="stock-card-title">TOTAL STOCK VALUE</div>
              <div className="stock-card-value">${totalStockValue}</div>
            </div>

            {/* Tarjeta: Productos con menor stock */}
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

        {/* Renderiza una sección por cada categoría */}
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
