import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar"; //  Importa el sidebar
import "./Stats.css"; //  Importa los estilos CSS
import SalesCard from "../../components/SalesCard/SalesCard"; //  Importa la tarjeta de ventas
import SettingsButton from "../../components/SettingsButton/SettingsButton"; //  Importa el botón de configuración
import AgeTargetCard from "../../components/AgeTargetCard/AgeTargetCard"; //  Importa la tarjeta de análisis de edad
import TopSellingProducts from "../../components/TopSellingProducts/TopSellingProducts"; //  Importa el componente de productos más vendidos

const Stats = () => {
  return (
    <div className="Stats-container"> {/*  Contenedor principal de la página */}
      <Sidebar /> {/*  Barra lateral fija */}

      <div className="Stats-content"> {/*  Contenedor del contenido principal */}
        <div className="Stats-header"> {/*  Encabezado con título y botón de configuración */}
          <h1 className="Stats-title">OVERVIEW</h1> {/*  Título de la sección */}
          <SettingsButton /> {/*  Botón de configuración */}
        </div>

        {/*  Sección superior con tarjetas de estadísticas */}
        <div className="Stats-top-stats">
          {/*  Tarjeta de ingresos totales */}
          <div className="Stats-stat-card">
            <img src="/src/img/GetRevenue.png" alt="Revenue Icon" /> {/*  Ícono de ingresos */}
            <p>TOTAL REVENUE</p> {/*  Texto descriptivo */}
            <span className="Stats-data">$25,000</span> {/* Valor de ingresos */}
          </div>

          {/*  Tarjeta de órdenes totales */}
          <div className="Stats-stat-card">
            <img src="/src/img/AddShopping.png" alt="Orders Icon" /> {/*  Ícono de órdenes */}
            <p>TOTAL ORDERS</p> {/*  Texto descriptivo */}
            <span className="Stats-data">143</span> {/*  Valor de órdenes */}
          </div>

          {/*  Tarjeta de usuarios totales */}
          <div className="Stats-stat-card">
            <img src="/src/img/PersonOutline.png" alt="Users Icon" /> {/*  Ícono de usuarios */}
            <p>TOTAL USERS</p> {/*  Texto descriptivo */}
            <span className="Stats-data">459</span> {/*  Valor de usuarios */}
          </div>
        </div>

        {/*  Sección de análisis y distribución de datos */}
        <div className="Stats-grid">
          <SalesCard /> {/*  Tarjeta de ventas */}
          <AgeTargetCard /> {/*  Tarjeta de análisis de edad */}
        </div>

        {/*  Sección de productos más vendidos */}
        <div className="Stats-top-selling-container">
          <TopSellingProducts /> {/*  Componente de productos más vendidos */}
        </div>
      </div>
    </div>
  );
};

export default Stats;
