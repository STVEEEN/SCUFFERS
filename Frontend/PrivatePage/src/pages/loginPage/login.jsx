import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Asegúrate de que la ruta es correcta

export default function Login() {
  const navigate = useNavigate(); // Hook para manejar la navegación
  const [email, setEmail] = useState(""); // Estado para almacenar el email
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña
  const [errorMessage, setErrorMessage] = useState(""); // Estado para manejar mensajes de error

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage("INVALID DATA"); // Muestra error si los campos están vacíos
      return;
    }
    if (!email.includes("@gmail.com")) {
      setErrorMessage("INVALID EMAIL FORMAT"); // Muestra error si el email no tiene el formato correcto
      return;
    }
    navigate("/Stats"); // Redirige a la página de estadísticas si los datos son válidos
  };

  return (
    <div className="login-page">
      {/* Flecha en la esquina superior izquierda que redirige a FirstUser */}
      <div className="back-arrow" onClick={() => navigate("/")}>
        <img src="/src/img/Flecha.png" />
      </div>

      {/* Contenedor del logo, centrado en la parte superior */}
      <div className="logo-container">
        <img src="/src/img/Logo.png" alt="Logo" />
      </div>

      <div className="login-container">
        {/* Sección de imagen (izquierda) */}
        <div className="login-image">
        
        </div>

        {/* Sección del formulario (derecha) */}
        <div className="login-form">
          <h2>
            LOGIN WITH YOUR <br /> CREDENTIALS
          </h2>

          {/* Campo de Email con validación */}
          <input
            type="email"
            placeholder="EMAIL"
            value={email}
            onFocus={(e) => (e.target.placeholder = "")} // Borra el placeholder al enfocar
            onBlur={(e) => {
              if (e.target.value === "") e.target.placeholder = "EMAIL"; // Restaura el placeholder si está vacío
            }}
            onChange={(e) => setEmail(e.target.value)} // Actualiza el estado del email
          />

          {/* Campo de Password con texto dentro */}
          <input
            type="text"
            placeholder="PASSWORD"
            value={password}
            onFocus={(e) => {
              if (e.target.value === "PASSWORD") setPassword(""); // Borra el texto al enfocar
            }}
            onBlur={(e) => {
              if (e.target.value === "") setPassword("PASSWORD"); // Restaura el texto si está vacío
            }}
            onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de la contraseña
          />

          {/* Enlace para recuperar contraseña */}
          <a href="/passwordRecovery" className="forgot-password">
            Forgot your password?
          </a>

          {/* Botón de inicio con validación */}
          <button className="start-buttonLogin" onClick={handleLogin}>
            START
          </button>

          {/* Mensaje de error si los datos son inválidos */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}
