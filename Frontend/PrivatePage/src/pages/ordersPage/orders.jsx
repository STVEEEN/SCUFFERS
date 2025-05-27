import React from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import SettingsButton from "../../components/SettingsButton/SettingsButton";
import './orders.css';

const OrdersPage = () => {
  return (
    <div className="orders-container">
      <Sidebar activeItem="ORDERS" />
      
      <div className="main-content">
        {/* Header con título más pequeño */}
        <header className="orders-header">
          <h1>MANAGE YOUR ORDERS</h1>
          <SettingsButton />
        </header>

        {/* Tarjetas en columna */}
        <div className="cards-vertical">
          {/* Tarjeta TOTAL ORDERS */}
          <div className="card total-orders">
            <div className="card-icon"></div>
            <div className="card-content">
              <p>TOTAL ORDERS</p>
            </div>
          </div>

          {/* Tarjeta STATE OF ORDER */}
          <div className="card state-order">
            <h3>STATE OF ORDER</h3>
            <div className="state-items">
              <div className="state-item">
                <div className="item-icon"></div>
                <span>ADD PIECE</span>
              </div>
              <div className="state-item">
                <div className="item-icon"></div>
                <span>ORDERS</span>
              </div>
              <div className="state-item">
                <div className="item-icon"></div>
                <span>STOCK</span>
              </div>
              <div className="state-item">
                <div className="item-icon"></div>
                <span>USERS</span>
              </div>
              <div className="state-item">
                <div className="item-icon"></div>
                <span>EMPLOYEES</span>
              </div>
              <div className="state-item">
                <div className="item-icon"></div>
                <span>LOGOUT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;