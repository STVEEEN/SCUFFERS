import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./AgeTargetCard.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const AgeTargetCard = () => {
  const [ageData, setAgeData] = useState({
    labels: ["19 AÑOS", "24 AÑOS", "36 AÑOS"],
    datasets: [
      {
        data: [36.4, 17.4, 14.9],
        backgroundColor: ["#007bff", "#28a745", "#dc3545"],
      },
    ],
  });

  return (
    <div className="age-target-card">
      <div className="card-header">
        <h2>AGE TARGET</h2>
        <div className="icon-placeholder"></div>
      </div>

      <div className="card-content">
        <div className="chart-container">
          <Pie data={ageData} />
        </div>

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
