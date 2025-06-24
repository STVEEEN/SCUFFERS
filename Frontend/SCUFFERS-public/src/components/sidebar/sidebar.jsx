import React from 'react';
import './Sidebar.css';

const Sidebar = ({
  categories = [],
  activeCategory,
  setActiveCategory,
  sidebarOpen,
  setSidebarOpen
}) => {
  return (
    <>
      {/* Overlay para cerrar el sidebar en móvil */}
      <div
        className={`sidebar-backdrop${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside className={`sidebar-animated${sidebarOpen ? " open" : ""}`}>
        <div className="sidebar-title">CATEGORIES</div>
        <ul className="sidebar-list">
          {categories.map((category, idx) => (
            <li 
              key={category}
              className={`sidebar-item${activeCategory === category ? ' active' : ''}`}
              style={{ animationDelay: `${idx * 0.04 + 0.15}s` }}
              onClick={() => {
                setActiveCategory(category);
                setSidebarOpen(false); // cerrar menú en móvil al seleccionar
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;