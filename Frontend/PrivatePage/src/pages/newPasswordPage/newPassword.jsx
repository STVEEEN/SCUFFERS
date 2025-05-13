import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewPassword.css"; // Asegúrate de que la ruta es correcta
 
export default function NewPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
 
  const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
 
  const handleContinue = () => {
    if (!password || !confirmPassword) {
      setError("Please fill in both fields.");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
    } else if (!passwordRequirements.test(password)) {
      setError("YOUR PASSWORD DOES NOT MEET THE REQUIREMENTS");
    } else {
      setError("");
      navigate("/stats"); // Redirige a la pantalla de Stats después de crear la contraseña
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
 
          {/* Input de nueva contraseña con validación */}
          <input
            type="password"
            placeholder="NEW PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password-input"
          />
 
          {/* Input de confirmación de contraseña */}
          <input
            type="password"
            placeholder="CONFIRM PASSWORD"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="password-input"
          />
 
          {/* Botón CONTINUE con validación */}
          <button className="continue-button" onClick={handleContinue}>
            CONTINUE
          </button>
 
          {/* Mensaje de error debajo del botón */}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}
 
 