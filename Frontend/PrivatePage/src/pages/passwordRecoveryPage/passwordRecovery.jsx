import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PasswordRecovery.css"; // Asegúrate de que la ruta es correcta

export default function PasswordRecovery() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleRecovery = () => {
    if (!email) {
      setError("Please enter your email.");
    } else {
      setError("");
      navigate("/confirmation");
    }
  };

  return (
    <div className="password-recovery-page">
      {/* Flecha en la esquina superior izquierda redirige a la pantalla de Login */}
      <div className="back-arrow" onClick={() => navigate("/login")}>
        <img src="/path/to/your/arrow-icon.png" alt="Back" />
      </div>

      {/* Contenedor del logo, centrado en la parte superior */}
      <div className="logo-container">
        <img src="/path/to/your/logo.png" alt="Logo" />
      </div>

      {/* Contenedor principal del formulario */}
      <div className="recovery-container">
        <div className="recovery-form">
          <h2>RECOVER YOUR ACCOUNT</h2>
          <p className="label-text">ENTER YOUR EMAIL</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="recovery-input"
          />
          {error && <p className="error-message">{error}</p>}
          <p className="notification-text">
            WE MAY SEND YOU NOTIFICATIONS TO YOUR<br />
            GMAIL FOR SECURITY AND LOGIN PURPOSES.
          </p>
          <button className="recovery-button" onClick={handleRecovery}>
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}
