import React from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook para la navegación
import "./SettingsButton.css"; // Importa los estilos CSS

const SettingsButton = () => {
  const navigate = useNavigate(); // Hook para manejar la navegación

  return (
    <div 
      className="settings-button" 
      onClick={() => navigate("/Settings")}> {/* Redirige a la página de configuración al hacer cli */}

      <div className="icon-placeholder"></div> {/* Ícono de marcador de posición */}
    </div>
  );
};

export default SettingsButton;
