import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "./CodeConfirmation.css";

export default function CodeConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // El email debería ser pasado desde la pantalla anterior

  const [code, setCode] = useState(["", "", "", "", ""]); // 5 dígitos
  const [activeIndex, setActiveIndex] = useState(null);
  const inputRefs = useRef([]);

  // Maneja el cambio en los inputs del código
  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Avanza al siguiente input si hay valor y no es el último
      if (value !== "" && index < code.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // Maneja la tecla "Backspace"
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Unifica el código ingresado a string
  const getCodeString = () => code.join("");

  // Verifica el código con el backend
  const handleContinue = async () => {
    if (code.every((digit) => digit !== "")) {
      try {
        const res = await fetch("http://localhost:4000/api/passwordRecovery/verifyCode", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ code: getCodeString() }),
        });
        const data = await res.json();
        if (res.ok) {
          await Swal.fire({
            icon: "success",
            title: "Verified!",
            text: "The code is correct. You may now change your password.",
            confirmButtonColor: "#3085d6",
          });
          navigate("/newPassword", { state: { email } });
        } else {
          Swal.fire({
            icon: "error",
            title: "Invalid code",
            text: data.message || "The code you entered is incorrect.",
            confirmButtonColor: "#d33",
          });
        }
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Please try again later.",
          confirmButtonColor: "#d33",
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Incomplete code",
        text: "Please enter the complete code.",
        confirmButtonColor: "#f8bb86",
      });
    }
  };

  // Reenvía el código al email
  const handleResend = async (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Email not found",
        text: "No email found. Please go back and enter your email again.",
      });
      return;
    }
    try {
      const res = await fetch("http://localhost:4000/api/passwordRecovery/requestCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Code resent!",
          text: "Check your Gmail inbox for the new code.",
        });
        setCode(["", "", "", "", ""]);
        inputRefs.current[0].focus();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error resending code",
          text: data.message || "Please try again later.",
        });
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Could not resend code. Try again in a moment.",
      });
    }
  };

  return (
    <div className="code-confirmation-page">
      {/* Flecha para regresar */}
      <div className="back-arrow" onClick={() => navigate("/passwordRecovery")}>
        <img src="/src/img/Flecha.png" alt="Back" />
      </div>

      {/* Logo */}
      <div className="logo-container">
        <img src="/src/img/Logo.png" alt="Logo" />
      </div>

      {/* Formulario */}
      <div className="confirmation-container">
        <div className="confirmation-form">
          <h2>CONFIRM YOUR ACCOUNT</h2>
          <p className="instruction-text">
            We sent a code via Gmail.<br />
            Enter it to confirm your account.
          </p>

          {/* Inputs de código */}
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
                  inputMode="numeric"
                  autoComplete="one-time-code"
                />
                {activeIndex === index && <div className="active-bar"></div>}
              </div>
            ))}
          </div>

          {/* Reenviar código */}
          <a href="#" className="resend-code" onClick={handleResend}>
            DIDN'T RECEIVE THE CODE?
          </a>

          {/* Botón CONTINUE */}
          <button className="confirmation-button" onClick={handleContinue}>
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}