import React from "react";
import { Link } from "react-router-dom"; // Importa Link para la navegación
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Stats.css";
import SalesCard from "../../components/SalesCard/SalesCard";
import SettingsButton from "../../components/SettingsButton/SettingsButton"; // Botón de configuración

const Stats = () => {
  return (
    <div className="stats-container">
      <Sidebar />
      <div className="stats-content">
        <div className="header">
          <h1>OVERVIEW</h1>
          <SettingsButton />
        </div>

        {/* Estadísticas principales arriba */}
        <div className="top-stats">
          <div className="stat-card wide">
            <div className="icon-placeholder big"></div>
            <div className="text-section">
              <p>TOTAL REVENUE</p>
              <span>$25,000</span>
            </div>
          </div>
          <div className="stat-card wide">
            <div className="icon-placeholder big"></div>
            <div className="text-section">
              <p>TOTAL ORDERS</p>
              <span>143</span>
            </div>
          </div>
          <div className="stat-card wide">
            <div className="icon-placeholder big"></div>
            <div className="text-section">
              <p>TOTAL USERS</p>
              <span>459</span>
            </div>
          </div>
        </div>

        {/* Separación visual */}
        <div className="sales-analytics-container">
          <SalesCard />
        </div>
      </div>
    </div>
  );
};

export default Stats;
