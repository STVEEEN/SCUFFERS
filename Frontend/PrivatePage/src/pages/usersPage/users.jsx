import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar"; //  Importa el sidebar
import "./Users.css";

const Users = () => {
  return (
    <div className="users-container">
      {/* Sidebar fijo */}
      <Sidebar />

      {/* Área de contenido, separada del Sidebar, donde van las cards */}
      <div className="users-content">
        <div className="cards-column">
          {/* Card 1 */}
          <div className="user-card">
            <div className="card-top">
              <div className="icon-left">  
              <img src="/src/img/Users.png" />
              </div>
              <div className="icon-center">
                 <img src="/src/img/459.png" />
              </div>
            </div>
            <div className="card-bottom">
              <span className="card-text">PRODUCTS</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="user-card">
            <div className="card-top">
              <div className="icon-left">
                {/* Espacio para el ícono izquierdo */}
              </div>
              <div className="icon-center">
                {/* Espacio para el ícono central */}
              </div>
            </div>
            <div className="card-bottom">
              <span className="card-text">EMPLOYEES</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="user-card">
            <div className="card-top">
              <div className="icon-left">
                {/* Espacio para el ícono izquierdo */}
              </div>
              <div className="icon-center">
                {/* Espacio para el ícono central */}
              </div>
            </div>
            <div className="card-bottom">
              <span className="card-text">CUSTOMERS</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="user-card">
            <div className="card-top">
              <div className="icon-left">
                {/* Espacio para el ícono izquierdo */}
              </div>
              <div className="icon-center">
                {/* Espacio para el ícono central */}
              </div>
            </div>
            <div className="card-bottom">
              <span className="card-text">SUPPLIERS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
