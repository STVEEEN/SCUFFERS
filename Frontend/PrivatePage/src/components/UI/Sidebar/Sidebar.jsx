import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import "./Sidebar.css";

const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogout, setShowLogout] = useState(false);
  const [hideElements, setHideElements] = useState(false);

  const handleLogoutConfirm = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    setShowLogout(true);
    setHideElements(true);
  };

  const handleCancelLogout = () => {
    setShowLogout(false);
    setHideElements(false);
  };

  // Si no está logueado, no mostrar sidebar
  if (!user) return null;

  // Helpers de permisos
  const isAdmin = user.role === "Admin";
  const isGerente = user.role === "Gerente";
  const isEmployee = user.role === "Employee";
  const isBodeguero = user.role === "Bodeguero";

  return (
    <div className="Sidebar-container">
      <nav className="Sidebar-nav">
        <ul>
          <li className="Sidebar-logoApp">
            <img src="/src/img/LogoSideBar.png" alt="Logo" />
          </li>

          {/* Stats: Solo Admin y Gerente */}
          {(isAdmin || isGerente) && (
            <li className={location.pathname === "/Stats" ? "Sidebar-active" : ""}>
              <img src="/src/img/Stats.png" alt="Stats Icon" />
              <Link to="/Stats">STATS</Link>
            </li>
          )}

          {/* Categories: Todos */}
          {(isAdmin || isGerente || isEmployee || isBodeguero) && (
            <li className={location.pathname === "/categories" ? "Sidebar-active" : ""}>
              <img src="/src/img/categorias.png" alt="Categories Icon" />
              <Link to="/categories">CATEGORIES</Link>
            </li>
          )}

          {/* Add Piece: Todos */}
          {(isAdmin || isGerente || isEmployee || isBodeguero) && (
            <li className={location.pathname === "/addProducts" ? "Sidebar-active" : ""}>
              <img src="/src/img/AddPiece.png" alt="Add Piece Icon" />
              <Link to="/addProducts">ADD PIECE</Link>
            </li>
          )}

          {/* Orders: Admin, Gerente, Employee */}
          {(isAdmin || isGerente || isEmployee) && (
            <li className={location.pathname === "/orders" ? "Sidebar-active" : ""}>
              <img src="/src/img/Orders.png" alt="Orders Icon" />
              <Link to="/orders">ORDERS</Link>
            </li>
          )}

          {/* Stock: Todos */}
          {(isAdmin || isGerente || isEmployee || isBodeguero) && (
            <li className={location.pathname === "/stock" ? "Sidebar-active" : ""}>
              <img src="/src/img/Stock.png" alt="Stock Icon" />
              <Link to="/stock">STOCK</Link>
            </li>
          )}

          {/* Users: Admin, gerente */}
          {(isAdmin || isGerente) && (
            <li className={location.pathname === "/users" ? "Sidebar-active" : ""}>
              <img src="/src/img/Users.png" alt="Users Icon" />
              <Link to="/users">USERS</Link>
            </li>
          )}

          {/* Employees: Solo Admin */}
          {isAdmin && (
            <li className={location.pathname === "/employees" ? "Sidebar-active" : ""}>
              <img src="/src/img/employees.png" alt="employees Icon" />
              <Link to="/employees">EMPLOYEES</Link>
            </li>
          )}
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