import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogoutConfirm = () => {
    navigate("/login");
  };

  return (
    <div className="Sidebar-container">
      {/* Navegación con enlaces e íconos */}
      <nav className="Sidebar-nav">
        <ul>
          <li className="Sidebar-logoApp">
            <img src="/src/img/LogoSideBar.png" alt="Logo" />
          </li>
          <li>
            <img src="/src/img/Stats.png" alt="Stats Icon" />
            <Link to="/Stats">STATS</Link>
          </li>
          <li>
            <img src="/src/img/AddPiece.png" alt="Add Piece Icon" />
            <Link to="/addProducts">ADD PIECE</Link>
          </li>
          <li>
            <img src="/src/img/Orders.png" alt="Orders Icon" />
            <Link to="/orders">ORDERS</Link>
          </li>
          <li>
            <img src="/src/img/Stock.png" alt="Stock Icon" />
            <Link to="/stock">STOCK</Link>
          </li>
          <li>
            <img src="/src/img/Users.png" alt="Users Icon" />
            <Link to="/users">USERS</Link>
          </li>
        </ul>
      </nav>

      {/* Botón Logout con tarjeta de confirmación */}
      <div className="Sidebar-logout-container">
        <img src="/src/img/Atras.png" alt="Back Icon" />
        <button className="Sidebar-logout-btn" onClick={() => setShowLogout(true)}>LOGOUT</button>
      </div>

      {showLogout && (
        <div className="Sidebar-logout-confirmation">
          <p>Are you sure you want to log out?</p>
          <div className="Sidebar-logout-buttons">
            <button className="Sidebar-confirm-btn" onClick={handleLogoutConfirm}>Yes</button>
            <button className="Sidebar-cancel-btn" onClick={() => setShowLogout(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
