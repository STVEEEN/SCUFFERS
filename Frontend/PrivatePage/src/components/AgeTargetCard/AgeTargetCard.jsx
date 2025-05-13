import React, { useState } from "react";
import { Pie } from "react-chartjs-2"; // Importa el componente de gráfico de pastel
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Importa los elementos necesarios de Chart.js
import "./AgeTargetCard.css"; // Importa los estilos CSS

// Registra los elementos de Chart.js para que funcionen correctamente
ChartJS.register(ArcElement, Tooltip, Legend);

const AgeTargetCard = () => {
  // Estado para almacenar los datos del gráfico
  const [ageData, setAgeData] = useState({
    labels: ["19 AÑOS", "24 AÑOS", "36 AÑOS"], // Etiquetas de los grupos de edad
    datasets: [
      {
        data: [36.4, 17.4, 14.9], // Porcentajes de cada grupo de edad
        backgroundColor: ["#007bff", "#28a745", "#dc3545"], // Colores para cada segmento del gráfico
      },
    ],
  });

  return (
    <div className="age-target-card"> {/* Contenedor principal de la tarjeta */}
      <div className="card-header"> {/* Encabezado de la tarjeta */}
        <h2>AGE TARGET</h2> {/* Título de la tarjeta */}
        <img src="/src/img/Target.png" alt="Target Icon" /> {/* Ícono de objetivo */}
      </div>

      <div className="card-content"> {/* Contenedor del contenido de la tarjeta */}
        {/* Contenedor del gráfico de pastel */}
        <div className="chart-container">
          <Pie data={ageData} /> {/* Renderiza el gráfico de pastel con los datos */}
        </div>

        {/* Información sobre los porcentajes de cada grupo de edad */}
        <div className="age-info">
          {ageData.labels.map((label, index) => (
            <p key={index} style={{ color: ageData.datasets[0].backgroundColor[index] }}>
              {label}: {ageData.datasets[0].data[index]}%
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgeTargetCard;
