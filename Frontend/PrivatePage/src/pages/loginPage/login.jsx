import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Swal from "sweetalert2"; // Importa SweetAlert2
import "./login.css";

// Página de inicio de sesión para distintos roles de usuario
export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Estados para almacenar el correo, contraseña y errores
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Función que maneja el inicio de sesión
  const handleLogin = async () => {
    // Validar campos vacíos
    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Datos incompletos",
        text: "Por favor ingresa tu correo y contraseña.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    const result = await login(email, password);

    if (!result.success) {
      // Muestra alerta de error si falló el login
      Swal.fire({
        icon: "error",
        title: "Login fallido",
        text: result.message || "No se pudo iniciar sesión.",
        confirmButtonColor: "#d33",
      });
      setErrorMessage(result.message || "LOGIN FAILED");
      return;
    }

    // Guardar email e ID en localStorage para futuras consultas
    localStorage.setItem("userEmail", result.email);
    localStorage.setItem("userId", result.id);

    // Alerta de bienvenida
    Swal.fire({
      icon: "success",
      title: "Bienvenido",
      text: `Has ingresado como ${result.role}`,
      confirmButtonColor: "#3085d6",
      timer: 1500,
      showConfirmButton: false,
    });

    // Redirigir según el rol del usuario
    if (result.role === "Admin" || result.role === "Gerente") {
      navigate("/Stats");
    } else if (result.role === "Bodeguero" || result.role === "Employee") {
      navigate("/addproducts");
    } else {
      Swal.fire({
        icon: "error",
        title: "Rol no autorizado",
        text: "Tu rol no tiene acceso a esta plataforma.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="login-page">
      {/* Flecha para volver a la página principal */}
      <div className="back-arrow" onClick={() => navigate("/")}>
        <img src="/src/img/Flecha.png" />
      </div>

      {/* Logo principal */}
      <div className="logo-container">
        <img src="/src/img/Logo.png" alt="Logo" />
      </div>

      {/* Contenedor principal del login */}
      <div className="login-container">
        <div className="login-image"></div>
        <div className="login-form">
          <h2>
            LOGIN WITH YOUR <br /> CREDENTIALS
          </h2>

          {/* Campo de entrada de email */}
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

          {/* Campo de entrada de contraseña */}
          <input
            type="password"
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

          {/* Enlace a recuperación de contraseña */}
          <a href="/passwordRecovery" className="forgot-password">
            Forgot your password?
          </a>

          {/* Botón de inicio de sesión */}
          <button className="start-buttonLogin" onClick={handleLogin}>
            START
          </button>

          {/* Mensaje de error si ocurre */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}
