import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewPassword.css"; // Asegúrate de que la ruta es correcta

export default function NewPassword() {
  const navigate = useNavigate(); // Hook para manejar la navegación
  const [password, setPassword] = useState(""); // Estado para almacenar la nueva contraseña
  const [confirmPassword, setConfirmPassword] = useState(""); // Estado para almacenar la confirmación de la contraseña
  const [error, setError] = useState(""); // Estado para manejar mensajes de error

  // Expresión regular para validar los requisitos de la contraseña
  const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

  // Función para manejar la validación y la navegación al hacer clic en "CONTINUE"
  const handleContinue = () => {
    if (!password || !confirmPassword) {
      setError("Please fill in both fields."); // Muestra error si los campos están vacíos
    } else if (password !== confirmPassword) {
      setError("Passwords do not match."); // Muestra error si las contraseñas no coinciden
    } else if (!passwordRequirements.test(password)) {
      setError("YOUR PASSWORD DOES NOT MEET THE REQUIREMENTS"); // Muestra error si la contraseña no cumple los requisitos
    } else {
      setError(""); // Limpia el mensaje de error si la contraseña es válida
      navigate("/stats"); // Redirige a la pantalla de Stats después de crear la contraseña
    }
  };

  return (
    <div className="new-password-page">
      {/* Flecha en la esquina superior izquierda que redirige a CodeConfirmation */}
      <div className="back-arrow" onClick={() => navigate("/codeConfirmation")}>
               <img src="/src/img/Flecha.png" />
      </div>

      {/* Contenedor del logo, centrado en la parte superior */}
      <div className="logo-container">
         <img src="/src/img/Logo.png" alt="Logo" />
      </div>

      {/* Contenedor principal del formulario */}
      <div className="password-container">
        <div className="password-form">
          <h2>CREATE A NEW PASSWORD</h2> {/* Título del formulario */}

          <p className="instruction-text">
            Your password must contain at least 12 characters, including:<br />
            - Special characters<br />
            - Uppercase and lowercase letters
          </p> {/* Mensaje de instrucciones */}

          {/* Input de nueva contraseña con validación */}
          <input
            type="password"
            placeholder="NEW PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de la contraseña
            className="password-input"
          />

          {/* Input de confirmación de contraseña */}
          <input
            type="password"
            placeholder="CONFIRM PASSWORD"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Actualiza el estado de confirmación
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
