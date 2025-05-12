import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Asegúrate de que la ruta es correcta

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Puedes agregar validaciones o lógica adicional
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

          <input
            type="password"
            placeholder="PASSWORD"
            value={password}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => {
              if (e.target.value === "") e.target.placeholder = "PASSWORD";
            }}
            onChange={(e) => setPassword(e.target.value)}
          />

          <a href="/passwordRecovery" className="forgot-password">
            Forgot your password?
          </a>

          <button className="start-button" onClick={handleLogin}>
            START
          </button>
        </div>
      </div>
    </div>
  );
}
