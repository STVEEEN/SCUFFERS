import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PasswordRecovery.css"; // Asegúrate de que la ruta es correcta

export default function PasswordRecovery() {
  const navigate = useNavigate(); // Hook para manejar la navegación
  const [email, setEmail] = useState(""); // Estado para almacenar el email ingresado
  const [error, setError] = useState(""); // Estado para manejar mensajes de error

  // Función para manejar la recuperación de contraseña
  const handleRecovery = () => {
    if (!email) {
      setError("Please enter your email."); // Muestra error si el campo está vacío
    } else if (!email.endsWith("@gmail.com")) {
      setError("Please enter a valid Gmail address."); // Muestra error si el email no es de Gmail
    } else {
      setError(""); // Limpia el mensaje de error si el email es válido
      navigate("/codeConfirmation"); // Redirige a la página de confirmación de código
    }
  };

  return (
    <div className="password-recovery-page">
      {/* Flecha en la esquina superior izquierda que redirige a la pantalla de Login */}
      <div className="back-arrow" onClick={() => navigate("/login")}>
        <img src="/src/img/Flecha.png"  />
      </div>

      {/* Contenedor del logo, centrado en la parte superior */}
      <div className="logo-container">
        <img src="/src/img/Logo.png" alt="Logo" />
      </div>

      {/* Contenedor principal del formulario */}
      <div className="recovery-container">
        <div className="recovery-form">
          <h2>RECOVER YOUR ACCOUNT</h2> {/* Título del formulario */}
          
          <p className="label-text">ENTER YOUR EMAIL</p> {/* Etiqueta para el campo de email */}
          
          {/* Campo de Email con validación */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Actualiza el estado del email
            className="recovery-input"
          />

          {/* Mensaje de error si el email es inválido */}
          {error && <p className="error-message">{error}</p>}

          {/* Mensaje informativo sobre notificaciones */}
          <p className="notification-text">
            WE MAY SEND YOU NOTIFICATIONS TO YOUR<br />
            GMAIL FOR SECURITY AND LOGIN PURPOSES.
          </p>

          {/* Botón para continuar con la recuperación */}
          <button className="recovery-button" onClick={handleRecovery}>
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}
