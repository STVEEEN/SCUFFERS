import React from 'react';
import '../styles/styles.css';

const categories = [
  { id: 1, name: 'PANTS', image: '/assets/pants.jpg' },
  { id: 2, name: 'LONGSLEEVES', image: '/assets/longsleeves.jpg' },
  { id: 3, name: 'JACKETS', image: '/assets/jackets.jpg' },
  { id: 4, name: 'ACCESSORIES', image: '/assets/accessories.jpg' },
];

export default function Man() {
  return (
    <div className="category-page container">
      <h1>WELCOME SEE THE NEW IN MAN</h1>
      <div className="category-grid">
        {categories.map(cat => (
          <div key={cat.id} className="category-card">
            <img src={cat.image} alt={cat.name} />
            <div className="overlay">
              <h2>{cat.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
