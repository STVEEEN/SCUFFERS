// src/pages/LoginAndRegister/LoginAndRegister.jsx
import React from "react";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import "./LoginAndRegister.css";

const LoginAndRegister = () => {
  return (
    <div className="login-register-page">
      <Navbar />
      <div className="main-content">
        <Sidebar />

        <div className="form-section">
          {/* Aquí irá el formulario de login o registro */}
          <h2>Bienvenido</h2>
          <p>Selecciona una opción para ingresar o registrarte.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginAndRegister;
