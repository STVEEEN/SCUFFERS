import React from "react";
import Sidebar from "../../components/UI/Sidebar/Sidebar"; // Importa el componente de la barra lateral
import "./stock.css";
import SettingsButton from "../../components/UI/SettingsButton/SettingsButton"; // Importa el botón de configuración

const StockPage = () => {
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
            {/* Card Total Products */}
            <div className="stock-card">
              <div className="stock-card-content">
                <div className="stock-card-text">
                  <div className="stock-card-title">TOTAL PRODUCTS</div>
                  <div className="stock-card-value">158</div>
                </div>
                <div className="stock-card-icon">
                   <img src="/src/img/TOTALPRODUCTS.png" alt="TOTAL PRODUCTS" />
                </div>
              </div>
            </div>

            {/* Card Low Stock */}
            <div className="stock-card">
              <div className="stock-card-content">
                <div className="stock-card-text">
                  <div className="stock-card-title">LOW STOCK</div>
                  <div className="stock-card-value">9</div>
                </div>
                <div className="stock-card-icon">
                  <img src="/src/img/LOWSTOCK.png" alt="LOW STOCK" />
                </div>
              </div>
            </div>

            {/* Card Out of Stock */}
            <div className="stock-card">
              <div className="stock-card-content">
                <div className="stock-card-text">
                  <div className="stock-card-title">OUT OF STOCK</div>
                  <div className="stock-card-value">6</div>
                </div>
                <div className="stock-card-icon">
                  <img src="/src/img/OUTOFSTOCK.png" alt="OUT OF STOCK" />
                </div>
              </div>
            </div>

            {/* Card Suppliers */}
            <div className="stock-card">
              <div className="stock-card-content">
                <div className="stock-card-text">
                  <div className="stock-card-title">SUPPLIERS</div>
                  <div className="stock-card-value">3</div>
                </div>
                <div className="stock-card-icon">
                  <img src="/src/img/SUPPLIERS.png" alt="SUPPLIERS" />
                </div>
              </div>
            </div>

            {/* Card Value of Stock */}
            <div className="stock-value-card-dark">
              <div className="stock-value-content-dark">
                <div className="stock-value-main-dark">
                  <div className="stock-value-title-dark">VALUE OF STOCK</div>
                  <div className="stock-value-amount-dark">$2,750</div>
                </div>
                
                <div className="stock-value-divider-dark"></div>
                
                <div className="stock-value-details-dark">
                  <div className="stock-value-item-dark">
                    <span className="stock-value-label-dark">STATUS</span>
                  </div>
                  <div className="stock-value-item-dark">
                    <span className="stock-value-data-dark">UNFULFILLED</span>
                    <span className="stock-value-number-dark">4</span>
                  </div>
                  <div className="stock-value-item-dark">
                    <span className="stock-value-data-dark">RECEIVED</span>
                    <span className="stock-value-number-dark">1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Nueva Card T-Shirt - Diseño Actualizado */}
            <div className="stock-product-card">
              <div className="stock-product-content">
                {/* Título T-SHIRT alineado a la izquierda */}
                <div className="stock-product-title">T-SHIRT</div>
                
                {/* Sección de AMOUNT y valor */}
                <div className="stock-product-amount-section">
                  <div className="stock-product-amount-label">AMOUNT</div>
                  <button className="stock-product-amount-value">27</button>
                </div>
                
                {/* Botón SEE ALL en la parte inferior */}
                <div className="stock-product-footer">
                  <button className="stock-product-see-all-btn">SEE ALL</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockPage;