import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const categories = [
  { id: 1, name: 'MAN', route: '/man', image: '/assets/man.jpg' },
  { id: 2, name: 'COLLECTIONS', route: '/collections', image: '/assets/collections.jpg' },
  { id: 3, name: 'JUST WOMAN', route: '/woman', image: '/assets/woman.jpg' },
];

export default function Home() {
  const nav = useNavigate();
  return (
    <div className="home container">
      <h1>SCUFFERS</h1>
      <div className="category-grid">
        {categories.map(cat => (
          <div key={cat.id} className="category-card" onClick={() => nav(cat.route)}>
            <img src={cat.image} alt={cat.name} />
            <div className="overlay">
              <h2>{cat.name}</h2>
              <button>SHOP NOW</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
