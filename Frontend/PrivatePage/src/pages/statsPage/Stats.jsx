import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Stats.css";
import SalesCard from "../../components/SalesCard/SalesCard";
import SettingsButton from "../../components/SettingsButton/SettingsButton";
import AgeTargetCard from "../../components/AgeTargetCard/AgeTargetCard";
import TopSellingProducts from "../../components/TopSellingProducts/TopSellingProducts";

const Stats = () => {
  return (
    <div className="stats-container">
      <Sidebar />
      <div className="stats-content">
        <div className="header">
          <h1>OVERVIEW</h1>
          <SettingsButton />
        </div>
        {/* Cards superiores con más ancho */}
        <div className="top-stats">
          <div className="stat-card">
            <div className="icon-placeholder"></div>
            <p>TOTAL REVENUE</p>
            <span className="data">$25,000</span>
             
          </div>
          <div className="stat-card">
               <div className="icon-placeholder"></div>
            <p >TOTAL ORDERS</p>
        
            <span className="data">143</span>
          </div>
          <div className="stat-card">
                    <div className="icon-placeholder"></div>
            <p>TOTAL USERS</p>
            <span className="data">459</span>
          </div>
        </div>

        {/* Distribución óptima de análisis y productos */}
        <div className="stats-grid">
          <SalesCard />
          <AgeTargetCard />
        </div>

        {/* Top Selling Products en la parte inferior */}
        <div className="top-selling-container">
          <TopSellingProducts />
        </div>
      </div>
    </div>
  );
};

export default Stats;
