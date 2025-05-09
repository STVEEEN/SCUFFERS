import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";

export default function Navbar({ toggleMenu, cartItemCount }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/Shipping" className="nav-link">SHIPPING</Link> |
        <Link to="/login" className="nav-link">LOGIN</Link> |
        <Link to="/products" className="nav-link">SHOP</Link> |
        <Link to="/man" className="nav-link">MAN</Link> |
        <Link to="/collections" className="nav-link">COLLECTION</Link> |
        <Link to="/woman" className="nav-link">JUST WOMAN</Link>
      </div>

      <div className="logo">
        <Link to="/">Scuffers</Link>
      </div>

      <div className="navbar-right">
        <Link to="/cart" className="bag-link">BAG ({cartItemCount})</Link>
        <span className="search-icon">⌕</span>
      </div>
    </header>
  );
}
