import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    'STATEMENT PIECES',
    'JUST WOMAN',
    'HOODIES',
    'LONGSLEEVES',
    'PUFFERS',
    'JACKETS',
    'ACCESSORIES',
    'T-SHIRT',
    'PANTS',
    'SHORTS',
    'TANK-TOPS'
  ];
  
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h2 className="sidebar-title">CATEGORIES</h2>
      </div>
      
      <ul className="sidebar-list">
        {categories.map((category) => (
          <li 
            key={category}
            className={`sidebar-item ${activeCategory === category ? 'active' : ''}`}
            onClick={() => {
              // Solo actualiza si es una categoría diferente
              if (activeCategory !== category) {
                setActiveCategory(category);
              }
            }}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;