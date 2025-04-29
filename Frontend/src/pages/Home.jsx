import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

// Importación directa desde src/assets
import imgMan from '../assets/hombreportada.JPG';
import imgCollections from '../assets/hombreportada2.JPG';
import imgWoman from '../assets/portadaWomen.PNG';

const categories = [
  { id: 1, name: 'MAN', route: '/man', image: imgMan },
  { id: 2, name: 'COLLECTIONS', route: '/collections', image: imgCollections },
  { id: 3, name: 'JUST WOMAN', route: '/woman', image: imgWoman },
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
