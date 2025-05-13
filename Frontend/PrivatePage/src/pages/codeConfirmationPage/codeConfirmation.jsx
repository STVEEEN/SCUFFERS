import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./CodeConfirmation.css"; // Asegúrate de que la ruta es correcta

export default function CodeConfirmation() {
  const navigate = useNavigate(); // Hook para manejar la navegación
  const [code, setCode] = useState(["", "", "", "", "", ""]); // Estado para almacenar los 6 dígitos del código
  const [activeIndex, setActiveIndex] = useState(null); // Estado para manejar el input activo
  const [errorMessage, setErrorMessage] = useState(""); // Estado para manejar mensajes de error
  const inputRefs = useRef([]); // Referencias para los inputs del código

  // Maneja el cambio en los inputs del código
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

  // Maneja la tecla "Backspace" para retroceder en los inputs
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Maneja la validación y la navegación al hacer clic en "CONTINUE"
  const handleContinue = () => {
    if (code.every(digit => digit !== "")) {
      navigate("/newPassword"); // Redirige a la página de nueva contraseña si el código es válido
    } else {
      setErrorMessage("INVALID CODE"); // Muestra error si el código no está completo
    }
  };

  return (
    <div className="code-confirmation-page">
      {/* Flecha en la esquina superior izquierda que redirige a PasswordRecovery */}
      <div className="back-arrow" onClick={() => navigate("/passwordRecovery")}>
       <img src="/src/img/Flecha.png" />
      </div>

      {/* Contenedor del logo, centrado en la parte superior */}
      <div className="logo-container">
       <img src="/src/img/Logo.png" alt="Logo" />
      </div>

      {/* Contenedor principal del formulario */}
      <div className="confirmation-container">
        <div className="confirmation-form">
          <h2>CONFIRM YOUR ACCOUNT</h2> {/* Título del formulario */}
          
          <p className="instruction-text">
            We sent a code via Gmail.<br />
            Enter it to confirm your account.
          </p> {/* Mensaje de instrucciones */}

          {/* Input de código de confirmación (6 dígitos) */}
          <div className="code-inputs">
            {code.map((digit, index) => (
              <div key={index} className="code-input-container">
                <input
                  ref={(el) => (inputRefs.current[index] = el)} // Asigna referencias a los inputs
                  type="text"
                  maxLength="1" // Limita a un solo carácter
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)} // Maneja cambios en el input
                  onKeyDown={(e) => handleKeyDown(index, e)} // Maneja la tecla "Backspace"
                  onFocus={() => setActiveIndex(index)} // Activa el estado del input seleccionado
                  onBlur={() => setActiveIndex(null)} // Desactiva el estado cuando pierde el foco
                  className="code-input"
                />
                {activeIndex === index && <div className="active-bar"></div>} {/* Barra de selección activa */}
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
