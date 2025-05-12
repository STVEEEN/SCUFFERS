import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "./SalesCard.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesCard = () => {
  const [salesData, setSalesData] = useState({
    labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
    datasets: [
      {
        label: "REVENUE",
        data: [1500, 2700, 3400, 2900, 4300, 5100, 4900], 
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        tension: 0.4, 
        pointRadius: 4, 
      },
      {
        label: "EXPENSES",
        data: [1000, 1600, 2100, 2300, 3100, 3700, 3500], 
        borderColor: "#dc3545",
        backgroundColor: "rgba(220, 53, 69, 0.2)",
        tension: 0.4,
        pointRadius: 4, 
      },
      {
        label: "BALANCE",
        data: [500, 1100, 1300, 600, 1200, 1400, 1400], 
        borderColor: "#28a745",
        backgroundColor: "rgba(40, 167, 69, 0.2)",
        tension: 0.4,
        pointRadius: 4, 
      },
    ],
  });

  return (
    <div className="sales-card">
      <div className="card-header">
        <h2>SALES ANALITICS</h2>
      </div>

      <div className="chart-container">
        <Line 
          data={salesData} 
          options={{
            responsive: true,
            scales: {
              y: {
                beginAtZero: false, 
                min: 500, 
                max: 6000, 
              },
            },
            plugins: {
              legend: {
                position: "top", 
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default SalesCard;
