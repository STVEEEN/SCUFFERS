import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "./SalesCard.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const generateMayData = () => {
  const daysInMonth = 31;
  let sales = [];
  let expenses = [];
  let balance = [];

  for (let i = 1; i <= daysInMonth; i++) {
    let dailySales = Math.floor(Math.random() * (6000 - 1000) + 1000);
    let dailyExpenses = Math.floor(dailySales * (Math.random() * (0.8 - 0.4) + 0.4));
    let dailyBalance = dailySales - dailyExpenses;

    sales.push(dailySales);
    expenses.push(dailyExpenses);
    balance.push(dailyBalance);
  }

  return { sales, expenses, balance };
};

const mayData = generateMayData();

//  Función para obtener los días de la semana en la que cae la fecha seleccionada
const getWeekRange = (date) => {
  const day = date.getDate();
  const startOfWeek = day - (date.getDay() === 0 ? 6 : date.getDay() - 1); // Lunes como inicio de semana
  const endOfWeek = startOfWeek + 6;
  
  const adjustedStart = Math.max(1, startOfWeek);
  const adjustedEnd = Math.min(31, endOfWeek);

  return { start: adjustedStart, end: adjustedEnd };
};

const SalesCard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekRange, setWeekRange] = useState(getWeekRange(new Date())); 

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setWeekRange(getWeekRange(date)); 
  };

  const labels = Array.from({ length: weekRange.end - weekRange.start + 1 }, (_, i) => `May ${weekRange.start + i}`);
  
  const salesData = {
    labels: labels,
    datasets: [
      {
        label: "REVENUE",
        data: mayData.sales.slice(weekRange.start - 1, weekRange.end),
        borderColor: labels.includes(`May ${selectedDate.getDate()}`) ? "#ffcc00" : "#007bff", // 🔥 Resaltar día seleccionado en amarillo
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        tension: 0.4,
        pointRadius: labels.map(label => label.includes(`May ${selectedDate.getDate()}`) ? 8 : 4), // 🔥 Puntos más grandes para el día seleccionado
      },
      {
        label: "EXPENSES",
        data: mayData.expenses.slice(weekRange.start - 1, weekRange.end),
        borderColor: "#dc3545",
        backgroundColor: "rgba(220, 53, 69, 0.2)",
        tension: 0.4,
        pointRadius: 4,
      },
      {
        label: "BALANCE",
        data: mayData.balance.slice(weekRange.start - 1, weekRange.end),
        borderColor: "#28a745",
        backgroundColor: "rgba(40, 167, 69, 0.2)",
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  return (
    <div className="SalesCard-container">
      <div className="SalesCard-header">
        <h2 className="SalesCard-title">SALES ANALYTICS</h2>
        
        {/*  Recuadro con "Sort by" y la fecha seleccionada */}
        <div className="SalesCard-sort-by">
          <span>Sort by:</span> 
          <DatePicker 
            selected={selectedDate} 
            onChange={handleDateChange} 
            dateFormat="MMM d, yyyy" 
            className="SalesCard-datepicker"
          />
        </div>
      </div>

      {/*  Muestra la semana de la fecha seleccionada */}
      <div className="SalesCard-week-info">
        <strong>Week of May {weekRange.start} - {weekRange.end}</strong>
      </div>
      
      {/*  Gráfico que cambia según la fecha y destaca el día seleccionado */}
      <div className="SalesCard-chart">
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
