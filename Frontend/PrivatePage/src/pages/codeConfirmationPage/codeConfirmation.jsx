import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./CodeConfirmation.css"; // Asegúrate de que la ruta es correcta

export default function CodeConfirmation() {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) { // Solo permite números
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Si se escribe un número, avanza al siguiente cuadro
      if (value !== "" && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleContinue = () => {
    if (code.every(digit => digit !== "")) {
      navigate("/newPassword");
    } else {
      setErrorMessage("INVALID CODE");
    }
  };

  return (
    <div className="code-confirmation-page">
      {/* Flecha en la esquina superior izquierda que redirige a PasswordRecovery */}
      <div className="back-arrow" onClick={() => navigate("/passwordRecovery")}>
        <img src="/path/to/your/arrow-icon.png" alt="Back" />
      </div>

      {/* Contenedor del logo, centrado en la parte superior */}
      <div className="logo-container">
        <img src="/path/to/your/logo.png" alt="Logo" />
      </div>

      {/* Contenedor principal del formulario */}
      <div className="confirmation-container">
        <div className="confirmation-form">
          <h2>CONFIRM YOUR ACCOUNT</h2>
          <p className="instruction-text">
            We sent a code via Gmail.<br />
            Enter it to confirm your account.
          </p>

          {/* Input de código de confirmación (6 dígitos) */}
          <div className="code-inputs">
            {code.map((digit, index) => (
              <div key={index} className="code-input-container">
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onFocus={() => setActiveIndex(index)}
                  onBlur={() => setActiveIndex(null)}
                  className="code-input"
                />
                {activeIndex === index && <div className="active-bar"></div>}
              </div>
            ))}
          </div>

          {/* Enlace para reenviar código */}
          <a href="#" className="resend-code">
            DIDN'T RECEIVE THE CODE?
          </a>

          {/* Botón CONTINUE con validación */}
          <button className="confirmation-button" onClick={handleContinue}>
            CONTINUE
          </button>

          {/* Mensaje de error debajo del botón */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}
