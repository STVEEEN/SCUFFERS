import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa Link para la navegación interna y useNavigate para redirección
import "./Sidebar.css"; // Importa los estilos CSS

const Sidebar = () => {
  const navigate = useNavigate(); // Hook para manejar la navegación
  const [showLogout, setShowLogout] = useState(false); // Estado para mostrar la confirmación de logout

  // Función para confirmar el logout y redirigir al login
  const handleLogoutConfirm = () => {
    navigate("/login"); // Redirige a la página de login
  };

  return (
    <div className="sidebar"> {/* Contenedor principal de la barra lateral */}

      {/* Navegación con enlaces e íconos */}
      <nav>
        <ul>
          <li>
            <img src="/src/img/Logo.png" alt="Logo" /> {/* Logo de la aplicación */}
          </li>
          <li>
            <img src="/src/img/Stats.png" alt="Stats Icon" /> {/* Ícono de estadísticas */}
            <Link to="/Stats">STATS</Link> {/* Enlace a la página de estadísticas */}
          </li>
          <li>
            <img src="/src/img/AddPiece.png" alt="Add Piece Icon" /> {/* Ícono para agregar piezas */}
            <Link to="/addProducts">ADD PIECE</Link> {/* Enlace a la página de agregar productos */}
          </li>
          <li>
            <img src="/src/img/Orders.png" alt="Orders Icon" /> {/* Ícono de órdenes */}
            <Link to="/orders">ORDERS</Link> {/* Enlace a la página de órdenes */}
          </li>
          <li>
            <img src="/src/img/Stock.png" alt="Stock Icon" /> {/* Ícono de stock */}
            <Link to="/stock">STOCK</Link> {/* Enlace a la página de stock */}
          </li>
          <li>
            <img src="/src/img/Users.png" alt="Users Icon" /> {/* Ícono de usuarios */}
            <Link to="/users">USERS</Link> {/* Enlace a la página de usuarios */}
          </li>
        </ul>
      </nav>

      {/* Botón Logout con tarjeta de confirmación */}
      <div className="logout-container">
        <img src="/src/img/Atras.png" alt="Back Icon" /> {/* Ícono de logout */}
        <button className="logout-btn" onClick={() => setShowLogout(true)}>LOGOUT</button> {/* Botón para mostrar la confirmación */}
      </div>

      {/* Confirmación de logout */}
      {showLogout && (
        <div className="logout-confirmation">
          <p>Are you sure you want to log out?</p> {/* Mensaje de confirmación */}
          <div className="logout-buttons">
            <button className="confirm-btn" onClick={handleLogoutConfirm}>Yes</button> {/* Botón para confirmar logout */}
            <button className="cancel-btn" onClick={() => setShowLogout(false)}>Cancel</button> {/* Botón para cancelar logout */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
