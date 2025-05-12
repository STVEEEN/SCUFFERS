import React, { useState } from "react";
import "./SalesCard.css";

const SalesCard = () => {
  const [selectedDate, setSelectedDate] = useState("Julio 2025");
  const [graphImage, setGraphImage] = useState("/default-graph.png");

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    setGraphImage(`/graphs/${newDate}.png`);
  };

  const metrics = [
    { name: "REVENUE", value: "$2465", change: "+11.5%", color: "green" },
    { name: "EXPENSES", value: "$1567", change: "-7.6%", color: "red" },
    { name: "BALANCE", value: "$898", change: "+4.8%", color: "blue" },
  ];

  return (
    <div className="sales-card">
      <div className="sales-header">
        <h2>SALES ANALITIC</h2>
        <input type="month" value={selectedDate} onChange={handleDateChange} className="date-selector" />
      </div>

      <div className="metrics">
        {metrics.map((metric, index) => (
          <div key={index} className="metric">
            <h3>{metric.name}</h3>
            <p>{metric.value} <span className={`change ${metric.color}`}>{metric.change}</span></p>
          </div>
        ))}
      </div>

      <div className="chart-container">
        <img src={graphImage} alt="Sales Graph" className="sales-graph" />
      </div>
    </div>
  );
};

export default SalesCard;
