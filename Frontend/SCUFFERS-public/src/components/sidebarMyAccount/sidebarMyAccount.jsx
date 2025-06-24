import React from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebarMyAccount.css';

const SidebarMyAccount = ({ activeCategory, setActiveCategory }) => {
  const navigate = useNavigate();

  const categories = ['EDIT PROFILE', 'MY ADDRESS', 'MY ORDERS'];

  const handleClick = (category) => {
    if (activeCategory !== category) {
      setActiveCategory(category);
    }

    if (category === 'EDIT PROFILE') {
      navigate('/editProfile');
    } else if (category === 'MY ADDRESS') {
      navigate('/myAddress');
    } else if (category === 'MY ORDERS') {
      navigate('/myOrders'); // ✅ Ruta agregada
    }
  };

  return (
    <div className="sidebarMyAccount-container">
      <div className="sidebarMyAccount-header">
        <h2 className="sidebarMyAccount-title">MY ACCOUNT</h2>
      </div>

      <ul className="sidebarMyAccount-list">
        {categories.map((category) => (
          <li
            key={category}
            className={`sidebarMyAccount-item ${
              activeCategory === category ? 'active' : ''
            }`}
            onClick={() => handleClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarMyAccount;
