import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewPassword.css"; // Asegúrate de que la ruta es correcta

export default function NewPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!password || !confirmPassword) {
      setError("Please fill in both fields.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else {
      setError("");
      navigate("/home"); // Redirige a la pantalla principal después de crear la contraseña
    }
  };

  return (
    <div className="new-password-page">
      {/* Flecha en la esquina superior izquierda que redirige a CodeConfirmation */}
      <div className="back-arrow" onClick={() => navigate("/codeConfirmation")}>
        <img src="/path/to/your/arrow-icon.png" alt="Back" />
      </div>

      {/* Contenedor del logo, centrado en la parte superior */}
      <div className="logo-container">
        <img src="/path/to/your/logo.png" alt="Logo" />
      </div>

      {/* Contenedor principal del formulario */}
      <div className="password-container">
        <div className="password-form">
          <h2>CREATE A NEW PASSWORD</h2>
          <p className="instruction-text">
            Your password must contain at least 12 characters, including:<br />
            - Special characters<br />
            - Uppercase and lowercase letters
          </p>

          {/* Input de nueva contraseña con placeholder */}
          <input
            type="password"
            placeholder="NEW PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password-input"
          />

          {/* Input de confirmación de contraseña con placeholder */}
          <input
            type="password"
            placeholder="CONFIRM PASSWORD"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="password-input"
          />

          {/* Mensaje de error */}
          {error && <p className="error-message">{error}</p>}

          {/* Botón CONTINUE */}
          <button className="continue-button" onClick={handleContinue}>
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}
