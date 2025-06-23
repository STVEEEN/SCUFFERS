import React from "react";
import { useNavigate } from "react-router-dom";
import "./firstUserCard.css";

const FirstUserCard = ({ image, mainText, buttonText }) => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/products"); // Navega a la página de productos
  };

  return (
    <div className="first-user-card">
      <img 
        src={image} 
        alt={mainText} 
        className="card-image"
      />
      <div className="card-content">
        <div className="text-container">
          <h2 className="main-text">{mainText}</h2>
        </div>
        <div className="button-container">
          <button 
            className="card-button"
            onClick={handleShopNow} // Añade el manejador de clic
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstUserCard;