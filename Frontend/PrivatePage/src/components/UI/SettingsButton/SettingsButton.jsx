import React from "react";
import { useNavigate } from "react-router-dom";
import "./SettingsButton.css";

const SettingsButton = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="settings-button"  
      onClick={() => navigate("/Settings")}>

      {/* Ícono de configuración real */}
      <img src="/src/img/Settings.png" alt="Settings Icon" className="settings-icon" /> 
    </div>
  );
};

export default SettingsButton;
