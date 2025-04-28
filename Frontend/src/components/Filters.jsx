import React from 'react';
import '../styles/styles.css';

export default function Filters({ toggle, filters, setFilters }) {
  return (
    <div className={`filters ${toggle ? 'block' : 'hidden'}`}>
      <h3>Filters</h3>
      
      {/* Categoría */}
      <label>Category</label>
      <select value={filters.category} onChange={e => setFilters({...filters, category: e.target.value})}>
        <option value="">All</option>
        <option>Hoodies</option>
        <option>Outerwear</option>
        <option>Pants</option>
        <option>Shorts</option>
        <option>Accessories</option>
      </select>

      {/* Etiqueta */}
      <label>Tag</label>
      <select value={filters.tag} onChange={e => setFilters({...filters, tag: e.target.value})}>
        <option value="">All</option>
        <option>New Arrivals</option>
        <option>Best Sellers</option>
        <option>Back in Stock</option>
      </select>

      {/* Orden */}
      <label>Sort by</label>
      <select value={filters.sort} onChange={e => setFilters({...filters, sort: e.target.value})}>
        <option value="">None</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
    </div>
  );
}
