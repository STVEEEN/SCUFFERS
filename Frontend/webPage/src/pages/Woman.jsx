import React from 'react';
import '../styles/styles.css';

/// Importación directa desde src/assets
import imgWomenPants from '../../public/PortadaPantalonesMujer.PNG';
import imgWomenLongsleeves from '../../public/PortadaLongsleevesMujer.PNG';
import imgWomenJackets from '../../public/PortadaJacketsMujer.PNG';
import imgWomenAccesories from '../../public/PortadaAccesoriosMujeres.PNG';
import imgWomenTshirts from '../../public/PortadaCamisasMujer.PNG';

const categories = [
  { id: 1, name: 'T-shirts', route: '/man', image: imgWomenTshirts },
  { id: 2, name: 'Pants', route: '/collections', image: imgWomenPants },
  { id: 3, name: 'Jackets', route: '/woman', image: imgWomenJackets },
  { id: 4, name: 'Longsleeves', route: '/woman', image: imgWomenLongsleeves },
  { id: 5, name: 'Accesories', route: '/woman', image: imgWomenAccesories },
]
export default function Woman() {
  return (
    <div className="category-page container">
      <h1>WELCOME SEE THE NEW IN WOMAN</h1>
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
