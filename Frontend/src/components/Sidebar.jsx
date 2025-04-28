import React from 'react';
import '../styles/styles.css';

const categories = [
  'All Products', 'New Arrivals', 'Best Sellers', 'Back in Stock',
  'Hoodies', 'Outerwear', 'Knitwear', 'T-Shirts', 'Longsleeves', 'Pants', 'Shorts', 'Accessories'
];

export default function Sidebar({ filters, setFilters }) {
  return (
    <aside className="sidebar">
      <ul>
        {categories.map(c => (
          <li key={c} className="sidebar-item" onClick={() => setFilters({...filters, category: c === 'All Products' ? '' : c})}>
            {c}
          </li>
        ))}
      </ul>
    </aside>
  );
}
