import React from "react";
import "./productCard.css";

const StuffCard = ({ image, topText, bottomText }) => {
  return (
    <div className="stuff-card">
      {/* Contenedor de imagen */}
      <div className="image-container">
        <img 
          src={image} 
          alt="Stuff" 
          className="stuff-image"
        />
      </div>
      
      {/* Contenedor de textos */}
      <div className="text-content">
        <p className="top-text">{topText}</p>
        <p className="bottom-text">{bottomText}</p>
      </div>
    </div>
  );
};

export default StuffCard;