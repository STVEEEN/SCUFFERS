import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/styles.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">Scuffers</div>
        <div className="menu">
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/man">Man</NavLink>
          <NavLink to="/collections">Collections</NavLink>
          <NavLink to="/woman">Woman</NavLink>
          <NavLink to="/products">Products</NavLink>
        </div>
      </div>
    </nav>
  );
}
