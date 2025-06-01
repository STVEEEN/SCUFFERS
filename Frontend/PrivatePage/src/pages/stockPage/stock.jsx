import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./stock.css";
import SettingsButton from "../../components/SettingsButton/SettingsButton";

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
                  {/* Espacio para icono */}
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
                  {/* Espacio para icono */}
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
                  {/* Espacio para icono */}
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
                  {/* Espacio para icono */}
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

            {/* Nueva Card T-Shirt */}
           <div class="stock-product-card">
              <div class="stock-product-content">
                <div class="stock-product-header">
                  <div class="stock-product-title">T-SHIRT</div>
                  <div class="stock-product-amount">AMOUNT</div>
                </div>
                
                <div class="stock-product-value-container">
                  <div class="stock-product-value">27</div>
                </div>
                
                <div class="stock-product-footer">
                  <button class="stock-product-see-all-btn">SEE ALL</button>
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