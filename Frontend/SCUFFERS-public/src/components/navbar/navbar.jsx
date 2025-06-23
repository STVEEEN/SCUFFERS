import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  // Función para manejar clic en "MENU"
  const handleMenuClick = () => {
    navigate("/");
  };

  return (
    <nav className="scuffers-navbar">
      <div className="nav-left">
        {/* Elemento MENU clickeable */}
        <span 
          className="shipping-info menu-link"
          onClick={handleMenuClick}
        >
          MENU
        </span>
        <span className="separator">|</span>
        <span className="shipping-info">SHIPPING TO SAN SALVADOR</span>
        <span className="separator">|</span>
        <span className="account-link">MY ACCOUNT</span>
        <span className="separator">|</span>
        <span className="logout-link">LOGOUT</span>
      </div>

      <div className="nav-center">
        {/* Logo Scuffers - sin enlace */}
        <span className="brand-name">Scuffers</span>
      </div>

      <div className="nav-right">
        <span className="bag-indicator">BAG (0)</span>
      </div>
    </nav>
  );
};

export default Navbar;