import React from 'react';
import '../styles/styles.css';

/// Importación directa desde src/assets
import imgPants from '../assets/PortadaPantalonesColecciones.PNG';
import imgLongsleeves from '../assets/PortadaLongsleevesColecciones.PNG';
import imgJackets from '../assets/PortadaHoodiesColecciones.PNG';
import imgAccesories from '../assets/PortadaAccesoriosColecciones.PNG';
import imgTshirts from '../assets/PortadaColeccionCamisas.PNG';

const categories = [
  { id: 1, name: 'T-shirts', route: '/man', image: imgTshirts },
  { id: 2, name: 'Pants', route: '/collections', image: imgPants },
  { id: 3, name: 'Jackets', route: '/woman', image: imgJackets },
  { id: 4, name: 'Longsleeves', route: '/woman', image: imgLongsleeves },
  { id: 5, name: 'Accesories', route: '/woman', image: imgAccesories  },
]

export default function Collections() {
  return (
    <div className="category-page container">
      <h1>WELCOME SEE THE NEW IN COLLECTION</h1>
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
