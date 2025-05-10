import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PasswordRecovery.css";

export default function PasswordRecovery() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleRecovery = () => {
    if (!email) {
      setError("Please enter your email."); // Mensaje en inglés
    } else {
      setError("");
      navigate("/confirmation"); // Redirige a la página de confirmación
    }
  };

  return (
    <div className="password-recovery-page">
      {/* Flecha de retroceso reutilizada */}
      <div className="back-arrow" onClick={() => navigate(-1)}>
        <img src="/path/to/your/arrow-icon.png" alt="Back" />
      </div>

      {/* Logo en el centro superior reutilizado */}
      <div className="logo-container">
        <img src="/path/to/your/logo.png" alt="Logo" />
      </div>

      <div className="password-recovery-container">
        {/* Nueva información dentro del cuadro */}
        <h1 className="recovery-title">RECOVER YOUR PASSWORD</h1>
        <p className="recovery-text">
          Enter your email address and we will send you a link to reset your password.
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="recovery-input"
        />

        {/* Mensaje de error en inglés */}
        {error && <p className="error-message">{error}</p>}

        {/* Botón de recuperación */}
        <button className="recovery-button" onClick={handleRecovery}>
          SEND LINK
        </button>
      </div>
    </div>
  );
}
