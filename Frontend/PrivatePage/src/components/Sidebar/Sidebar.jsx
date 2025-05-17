import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false); // Estado para manejar el logout
  const [hideElements, setHideElements] = useState(false); // 🔥 Estado para ocultar logo y botón

  // 📌 Función para confirmar el logout y redirigir al login
  const handleLogoutConfirm = () => {
    navigate("/login");
  };

  // 📌 Cuando se hace clic en logout, ocultamos el logo y el botón
  const handleLogoutClick = () => {
    setShowLogout(true);
    setHideElements(true); // 🔥 Oculta los elementos innecesarios
  };

  // 📌 Si el usuario cancela, volvemos a mostrar los elementos
  const handleCancelLogout = () => {
    setShowLogout(false);
    setHideElements(false); // 🔥 Reactivamos los elementos ocultos
  };

  return (
    <div className="Sidebar-container">
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

      {!hideElements && (
        <div className="Sidebar-logout-container">
          <img src="/src/img/Atras.png" alt="Back Icon" />
          <button className="Sidebar-logout-btn" onClick={handleLogoutClick}>LOGOUT</button>
        </div>
      )}

      {showLogout && (
        <div className="Sidebar-logout-confirmation">
          <p>Are you sure to log out?</p>
          <div className="Sidebar-logout-buttons">
            <button className="Sidebar-confirm-btn" onClick={handleLogoutConfirm}>Yes</button>
            <button className="Sidebar-cancel-btn" onClick={handleCancelLogout}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
