import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("ARE YOU SURE YOU WANT TO LOG OUT?")) {
      navigate("/login");
    }
  };

  return (
    <div className="sidebar">
      {/* Icono principal centrado */}
      <div className="icon-placeholder large centered"></div>

      <nav>
        <ul>
          <li>
            <div className="icon-placeholder bigger"></div>
            <Link to="/stats">STATS</Link>
          </li>
          <li>
            <div className="icon-placeholder bigger"></div>
            <Link to="/addProducts">ADD PIECE</Link> {/* Cambia la ruta a /addproduct */}
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

      <div className="logout-container">
        <div className="icon-placeholder"></div>
        <button className="logout-btn" onClick={handleLogout}>LOGOUT</button>
      </div>
    </div>
  );
};

export default Sidebar;
