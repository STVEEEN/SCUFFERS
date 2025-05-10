import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./codeConfirmation.css";

export default function Confirmation() {
  const navigate = useNavigate();
  
  // Estado para almacenar cada dígito del código (6 campos)
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  // Función para regresar a la pantalla anterior
  const handleBack = () => {
    navigate(-1);
  };

  // Maneja el cambio en cada uno de los campos del código
  const handleChange = (e, index) => {
    const newCode = [...code];
    // Tomamos solo el primer carácter por si se pega más de uno
    newCode[index] = e.target.value.slice(0, 1);
    setCode(newCode);

    // Opcional: mover el foco al siguiente input automáticamente
    if (e.target.value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Función para enviar el código y continuar (aquí redirecciona al home)
  const handleContinue = () => {
    const codeValue = code.join("");
    console.log("Código ingresado:", codeValue);
    // Aquí puedes agregar la validación del código antes de continuar
    navigate("/");
  };

  return (
    <div className="confirmation-container">
      <header className="confirmation-header">
        <div className="back-section" onClick={handleBack}>
          <span className="back-arrow">&#8592;</span>
          <span className="back-text">Confirmacion de codigo</span>
        </div>
        <div className="logo-section">
          {/* Actualiza la ruta de la imagen conforme a la ubicación de tu logo */}
          <img src="/path/to/logo.png" alt="Logo" className="logo" />
        </div>
      </header>

      <main className="confirmation-main">
        <h1>CONFIRM YOUR ACCOUNT</h1>
        <p>WE SENT A CODE VIA GMAIL. ENTER IT TO CONFIRM YOUR ACCOUNT.</p>

        <div className="code-inputs">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="code-input"
            />
          ))}
        </div>

        <a
          className="resend-code"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/recovery");
          }}
        >
          DIDN’T RECEIVE THE CODE?
        </a>

        <button className="continue-button" onClick={handleContinue}>
          CONTINUE
        </button>
      </main>
    </div>
  );
}
