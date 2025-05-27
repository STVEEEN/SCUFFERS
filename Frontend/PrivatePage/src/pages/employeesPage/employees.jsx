import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import SettingsButton from "../../components/SettingsButton/SettingsButton";
import "./employees.css";

const employees = () => {
  return (
    <div className="employees-container">
      {/* Sidebar fijo */}
      <Sidebar />

      {/* Área de contenido, separada del Sidebar, donde van las cards */}
      <div className="employees-content">
        <div className="employees-header">
          <SettingsButton />
        </div>
        {/* Encabezado para la actividad de empleados */}
        <div className="activity-header">
          <h2>ACTIVITY OF EMPLOYEES</h2>
        </div>
        <div className="cards-column">
          {/* Card 1 */}
          <div className="employees-card">
            <div className="card-top">
              <div className="icon-left">  
                <img src="/src/img/Users.png" alt="Users Icon" />
              </div>
              <div className="icon-center">
                <img src="/src/img/459.png" alt="Data Icon" />
              </div>
            </div>
            <div className="card-bottom">
              <span className="card-text">TOTAL EMPLOYEES</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="employees-card">
            <div className="card-top">
              <div className="icon-left">
                <img src="/src/img/Love.png" alt="Active Icon" />
              </div>
              <div className="icon-center">
                <img src="/src/img/329.png" alt="Active Data Icon" />
              </div>
            </div>
            <div className="card-bottom">
              <span className="card-text">ACTIVE EMPLOYEES</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="employees-card">
            <div className="card-top">
              <div className="icon-left">
                <img src="/src/img/Roto.png" alt="Not Subscribed Icon" />
              </div>
              <div className="icon-center">
                <img src="/src/img/210.png" alt="Not Subscribed Data Icon" />
              </div>
            </div>
            <div className="card-bottom">
              <span className="card-text">NOT EMPLOYEES</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="employees-card">
            <div className="card-top">
              <div className="icon-left">
                <img src="/src/img/UserMas.png" alt="New Users Icon" />
              </div>
              <div className="icon-center">
                <img src="/src/img/67.png" alt="New Users Data Icon" />
              </div>
            </div>
            <div className="card-bottom">
              <span className="card-text">NEW EMPLOYEES</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default employees;
