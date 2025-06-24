import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Librería para mostrar alertas visuales agradables
import "./PasswordRecovery.css";

// Este componente permite al usuario solicitar un código de recuperación de contraseña
export default function PasswordRecovery() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // Estado del correo electrónico ingresado
  const [loading, setLoading] = useState(false); // Estado de carga al enviar solicitud

  // Valida formato de correo electrónico usando expresión regular
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Envía solicitud de recuperación y muestra alertas con SweetAlert2
  const handleRecovery = async () => {
    if (!email) {
      // Alerta si el campo de correo está vacío
      Swal.fire({
        icon: "warning",
        title: "Missing email",
        text: "Please enter your email.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }
    if (!validateEmail(email)) {
      // Alerta si el correo no tiene formato válido
      Swal.fire({
        icon: "warning",
        title: "Invalid email",
        text: "Please enter a valid email address.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    setLoading(true); // Comienza la carga
    try {
      // Solicitud POST al backend para enviar el código de recuperación
      const res = await fetch("http://localhost:4000/api/passwordRecovery/requestCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      // Si la respuesta indica éxito, muestra confirmación y redirige a la siguiente pantalla
      if (res.ok && data.message && data.message.toLowerCase().includes("enviado")) {
        await Swal.fire({
          icon: "success",
          title: "Code sent!",
          text: "Check your email for the recovery code.",
          confirmButtonColor: "#3085d6",
        });
        navigate("/codeConfirmation", { state: { email } });
      } else {
        // Muestra alerta de error con mensaje devuelto por el backend
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Could not send recovery code. Try again.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (e) {
      // Error de conexión con el servidor
      Swal.fire({
        icon: "error",
        title: "Server error",
        text: "Please try again later.",
        confirmButtonColor: "#d33",
      });
    }
    setLoading(false); // Finaliza carga
  };

  return (
    <div className="password-recovery-page">
      {/* Botón de retroceso a la pantalla de login */}
      <div className="back-arrow" onClick={() => navigate("/login")}>
        <img src="/src/img/Flecha.png" alt="Back" />
      </div>

      {/* Logo de la aplicación */}
      <div className="logo-container">
        <img src="/src/img/Logo.png" alt="Logo" />
      </div>

      {/* Formulario principal de recuperación */}
      <div className="recovery-container">
        <div className="recovery-form">
          <h2>RECOVER YOUR ACCOUNT</h2>
          <p className="label-text">ENTER YOUR EMAIL</p>
          
          {/* Campo de entrada de correo electrónico */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="recovery-input"
            autoFocus
          />

          {/* Mensaje de advertencia al usuario */}
          <p className="notification-text">
            WE MAY SEND YOU NOTIFICATIONS TO YOUR<br />
            EMAIL FOR SECURITY AND LOGIN PURPOSES.
          </p>

          {/* Botón para enviar recuperación, muestra spinner si está cargando */}
          <button className="recovery-button" onClick={handleRecovery} disabled={loading}>
            {loading ? "SENDING..." : "CONTINUE"}
          </button>
        </div>
      </div>
    </div>
  );
}
