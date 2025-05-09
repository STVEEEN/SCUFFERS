import React from 'react';
import '../styles/styles.css';

// Importación directa desde src/assets
import imgManPants from '../../public/PortadaPantalonesHombres.PNG';
import imgManLongsleeves from '../../public/PortadaLongsleevesHombres.PNG';
import imgManJackets from '../../public/PortadaJacketsHombres.PNG';
import imgManAccesories from '../../public/PortadaAccesoriosHombres.PNG';
import imgManTshirts from '../../public/PortadaCamisasHombres.PNG';

const categories = [
  { id: 1, name: 'T-shirts', route: '/man', image: imgManTshirts },
  { id: 2, name: 'Pants', route: '/collections', image: imgManPants },
  { id: 3, name: 'Jackets', route: '/woman', image: imgManJackets },
  { id: 4, name: 'Longsleeves', route: '/woman', image: imgManLongsleeves },
  { id: 5, name: 'Accesories', route: '/woman', image: imgManAccesories },
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
