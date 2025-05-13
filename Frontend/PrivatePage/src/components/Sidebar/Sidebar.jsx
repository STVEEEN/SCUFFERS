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
    <div className="sidebar">
      {/* Icono principal grande */}
      <div className="icon-placeholder super-large centered"></div>

      <nav>
        <ul>
          <li>
            <div className="icon-placeholder bigger"></div>
            <Link to="/Stats">STATS</Link>
          </li>
          <li>
            <div className="icon-placeholder bigger"></div>
            <Link to="/addProducts">ADD PIECE</Link>
          </li>
          <li>
            <div className="icon-placeholder bigger"></div>
            <Link to="/orders">ORDERS</Link>
          </li>
          <li>
            <div className="icon-placeholder bigger"></div>
            <Link to="/stock">STOCK</Link>
          </li>
          <li>
            <div className="icon-placeholder bigger"></div>
            <Link to="/users">USERS</Link>
          </li>
        </ul>
      </nav>

      {/* Botón Logout con tarjeta de confirmación */}
      <div className="logout-container">
        <div className="icon-placeholder"></div>
        <button className="logout-btn" onClick={() => setShowLogout(true)}>LOGOUT</button>
      </div>

      {showLogout && (
        <div className="logout-confirmation">
          <p>Are you sure you want to log out?</p>
          <div className="logout-buttons">
            <button className="confirm-btn" onClick={handleLogoutConfirm}>Yes</button>
            <button className="cancel-btn" onClick={() => setShowLogout(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
