import React from 'react';
import Sidebar from "../../components/Sidebar/Sidebar";
import SettingsButton from "../../components/SettingsButton/SettingsButton";
import './orders.css';

const OrdersPage = () => {
  return (
    <div className="orders-container">
      <Sidebar activeItem="ORDERS" />
      
      <div className="main2-content">
        {/* Header con título */}
        <header className="orders-header">
          <h1>MANAGE YOUR ORDERS</h1>
          <SettingsButton />
        </header>

        {/* Contenedor principal para cards y tabla */}
        <div className="content-wrapper">
          {/* Tarjetas en columna */}
          <div className="cards-vertical">
            {/* Tarjeta TOTAL ORDERS */}
            <div className="card total-orders">
              <div className="card-icon"></div>
              <div className="card-content">
                <p>TOTAL ORDERS</p>
              </div>
              <div className="card-icon">
                <img src="/src/img/143.png" alt="Total Orders" />
              </div>
            </div>

            {/* Tarjeta STATE OF ORDER */}
            <div className="card state-order">
              <h3>STATE OF ORDER</h3>
              <div className="state-items">
                <div className="state-item">
                  <div className="item-icon">
                    <img src="/src/img/Time.png" alt="Processing" />
                  </div>
                  <span>PROCESSING</span>
                  <div className="item2-icon">
                    <img src="/src/img/Time.png" alt="Processing" />
                  </div>
                </div>

                <div className="state-item">
                  <div className="item-icon">
                    <img src="/src/img/Camion.png" alt="Shipped" />
                  </div>
                  <span>SHIPPED</span>
                  <div className="item2-icon">
                    <img src="/src/img/Time.png" alt="Processing" />
                  </div>
                </div>

                <div className="state-item">
                  <div className="item-icon">
                    <img src="/src/img/Listo.png" alt="Delivered" />
                  </div>
                  <span>DELIVERED</span>
                  <div className="item2-icon">
                    <img src="/src/img/Time.png" alt="Processing" />
                  </div>
                </div>

                <div className="state-item">
                  <div className="item-icon">
                    <img src="/src/img/Cancelado.png" alt="Canceled" />
                  </div>
                  <span>CANCELED</span>
                  <div className="item2-icon">
                    <img src="/src/img/Time.png" alt="Processing" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de pedidos recientes (versión actualizada) */}
          <div className="recent-orders-table">
            <h3>RECENT ORDERS</h3>
            <table>
              <thead>
                <tr>
                  <th>BUYER</th>
                  <th>ORDER DATE</th>
                  <th>ITEMS</th>
                  <th>TOTAL</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="buyer-cell">
                      <span className="buyer-name">EDUARDO STEVEN</span>
                      <span className="order-id">ORDER ID: 24</span>
                    </div>
                  </td>
                  <td>17/06/2025</td>
                  <td>
                    <div className="items-cell">
                      <span className="items-icon">+</span>
                      <span>3</span>
                    </div>
                  </td>
                  <td>$365</td>
                  <td>
                    <select className="status-select processing" defaultValue="PROCESSING">
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="buyer-cell">
                      <span className="buyer-name">SANDOVAL AGUILAR</span>
                      <span className="order-id">ORDER ID: 25</span>
                    </div>
                  </td>
                  <td>18/06/2025</td>
                  <td>
                    <div className="items-cell">
                      <span className="items-icon">+</span>
                      <span>3</span>
                    </div>
                  </td>
                  <td>$365</td>
                  <td>
                    <select className="status-select shipped" defaultValue="SHIPPED">
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="buyer-cell">
                      <span className="buyer-name">DURISON MORALES</span>
                      <span className="order-id">ORDER ID: 26</span>
                    </div>
                  </td>
                  <td>21/06/2025</td>
                  <td>
                    <div className="items-cell">
                      <span className="items-icon">+</span>
                      <span>3</span>
                    </div>
                  </td>
                  <td>$365</td>
                  <td>
                    <select className="status-select shipped" defaultValue="SHIPPED">
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="buyer-cell">
                      <span className="buyer-name">ENRIQUE ECHEVERINA</span>
                      <span className="order-id">ORDER ID: 27</span>
                    </div>
                  </td>
                  <td>23/06/2025</td>
                  <td>
                    <div className="items-cell">
                      <span className="items-icon">+</span>
                      <span>3</span>
                    </div>
                  </td>
                  <td>$365</td>
                  <td>
                    <select className="status-select delivered" defaultValue="DELIVERED">
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="buyer-cell">
                      <span className="buyer-name">GERMAN ANTONIO</span>
                      <span className="order-id">ORDER ID: 29</span>
                    </div>
                  </td>
                  <td>26/06/2025</td>
                  <td>
                    <div className="items-cell">
                      <span className="items-icon">+</span>
                      <span>3</span>
                    </div>
                  </td>
                  <td>$365</td>
                  <td>
                    <select className="status-select cancelled" defaultValue="CANCELLED">
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;