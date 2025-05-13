import React, { useState } from "react";
import { Line } from "react-chartjs-2"; // Importa el gráfico de líneas de Chart.js
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js"; // Importa los elementos necesarios de Chart.js
import "./SalesCard.css"; // Importa los estilos CSS

// Registra los elementos de Chart.js para que funcionen correctamente
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesCard = () => {
  // Estado para almacenar los datos del gráfico
  const [salesData, setSalesData] = useState({
    labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"], // Días de la semana
    datasets: [
      {
        label: "REVENUE", // Ingresos
        data: [1500, 2700, 3400, 2900, 4300, 5100, 4900], // Datos de ingresos
        borderColor: "#007bff", // Color de la línea
        backgroundColor: "rgba(0, 123, 255, 0.2)", // Color de fondo con transparencia
        tension: 0.4, // Suaviza la curva de la línea
        pointRadius: 4, // Tamaño de los puntos en la línea
      },
      {
        label: "EXPENSES", // Gastos
        data: [1000, 1600, 2100, 2300, 3100, 3700, 3500], // Datos de gastos
        borderColor: "#dc3545", // Color de la línea
        backgroundColor: "rgba(220, 53, 69, 0.2)", // Color de fondo con transparencia
        tension: 0.4, // Suaviza la curva de la línea
        pointRadius: 4, // Tamaño de los puntos en la línea
      },
      {
        label: "BALANCE", // Balance
        data: [500, 1100, 1300, 600, 1200, 1400, 1400], // Datos de balance
        borderColor: "#28a745", // Color de la línea
        backgroundColor: "rgba(40, 167, 69, 0.2)", // Color de fondo con transparencia
        tension: 0.4, // Suaviza la curva de la línea
        pointRadius: 4, // Tamaño de los puntos en la línea
      },
    ],
  });

  return (
    <div className="SalesCard-container"> {/* Contenedor principal de la tarjeta */}
      <div className="SalesCard-header"> {/* Encabezado de la tarjeta */}
        <h2 className="SalesCard-title">SALES ANALYTICS</h2> {/* Título de la tarjeta */}
      </div>

      <div className="SalesCard-chart"> {/* Contenedor del gráfico */}
        <Line 
          data={salesData} 
          options={{
            responsive: true, // Hace que el gráfico sea adaptable
            maintainAspectRatio: false, // Permite que el gráfico ocupe más espacio
            scales: {
              y: {
                beginAtZero: false, // No comienza en cero para mejor visualización
                min: 500, // Valor mínimo del eje Y
                max: 6000, // Valor máximo del eje Y
              },
            },
            plugins: {
              legend: {
                position: "top", // Posición de la leyenda en la parte superior
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default SalesCard;
