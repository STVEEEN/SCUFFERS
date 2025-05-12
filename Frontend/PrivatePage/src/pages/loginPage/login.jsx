import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Asegúrate de que la ruta es correcta

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage("INVALID DATA");
      return;
    }
    if (!email.includes("@gmail.com")) {
      setErrorMessage("INVALID EMAIL FORMAT");
      return;
    }
    navigate("/Stats");
  };

  return (
    <div className="login-page">
      {/* Flecha en la esquina superior izquierda que redirige a FirstUser */}
      <div className="back-arrow" onClick={() => navigate("/")}>
        <img src="/path/to/your/arrow-icon.png" alt="Back" />
      </div>

      {/* Contenedor del logo, centrado en la parte superior */}
      <div className="logo-container">
        <img src="/path/to/your/logo.png" alt="Logo" />
      </div>

      <div className="login-container">
        {/* Sección de imagen (izquierda) */}
        <div className="login-image">
          <img src="/path/to/your/login-image.jpg" alt="Login" />
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
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => {
              if (e.target.value === "") e.target.placeholder = "EMAIL";
            }}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Campo de Password con texto dentro */}
          <input
            type="text"
            placeholder="PASSWORD"
            value={password}
            onFocus={(e) => {
              if (e.target.value === "PASSWORD") setPassword("");
            }}
            onBlur={(e) => {
              if (e.target.value === "") setPassword("PASSWORD");
            }}
            onChange={(e) => setPassword(e.target.value)}
          />

          <a href="/passwordRecovery" className="forgot-password">
            Forgot your password?
          </a>

          {/* Botón de inicio con validación */}
          <button className="start-button" onClick={handleLogin}>
            START
          </button>

          {/* Mensaje de error si los datos son inválidos */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}
