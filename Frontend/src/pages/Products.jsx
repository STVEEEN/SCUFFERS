import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/styles.css';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/src/data/products.json').then(res => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="products-page container">
      <h1>All Products</h1>
      <div className="products-grid">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
