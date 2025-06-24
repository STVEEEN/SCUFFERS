import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate("/products");
  };

  const handleLogoutClick = () => {
    navigate("/loginAndRegister");
  };

  const handleBrandClick = () => {
    navigate("/");
  };

  const handleAccountClick = () => {
    navigate("/myAccount");
  };

  const handleBagClick = () => {
    navigate("/shoppingCart");
  };

  return (
    <nav className="scuffers-navbar">
      <div className="nav-left">
        <span 
          className="shipping-info menu-link"
          onClick={handleMenuClick}
        >
          MENU
        </span>
        <span className="separator">|</span>
        <span className="shipping-info">SHIPPING TO SAN SALVADOR</span>
        <span className="separator">|</span>
        <span 
          className="account-link"
          onClick={handleAccountClick}
          style={{ cursor: "pointer" }}
        >
          MY ACCOUNT
        </span>
        <span className="separator">|</span>
        <span 
          className="logout-link"
          onClick={handleLogoutClick}
          style={{ cursor: "pointer" }}
        >
          LOGOUT
        </span>
      </div>

      <div className="nav-center">
        <span 
          className="brand-name"
          onClick={handleBrandClick}
          style={{ cursor: "pointer" }}
        >
          Scuffers
        </span>
      </div>

      <div className="nav-right">
        <span 
          className="bag-indicator"
          onClick={handleBagClick}
          style={{ cursor: "pointer" }}
        >
          BAG (0)
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
