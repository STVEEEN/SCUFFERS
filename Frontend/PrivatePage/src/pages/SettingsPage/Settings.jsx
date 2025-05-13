import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css"; // Importa los estilos CSS

export default function Settings() {
  const navigate = useNavigate(); // Hook para manejar la navegación
  const [email, setEmail] = useState(""); // Estado para almacenar el email
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña
  const [phone, setPhone] = useState(""); // Estado para almacenar el número de teléfono

  return (
      <div className="Settings-page">
      {/* Flecha en la esquina superior izquierda que redirige a CodeConfirmation */}
      <div className="back-arrow" onClick={() => navigate("/stats")}>
               <img src="/src/img/Flecha.png" />
      </div>

      {/* Contenedor del logo, centrado en la parte superior */}
      <div className="logo-container">
         <img src="/src/img/Logo.png" alt="Logo" />
      </div>
    
    <div className="settings-page">
      {/* Contenedor principal */}
      <div className="container">
        {/* Sección para cambiar datos */}
        <div className="data-section">
          <h2>CHANGE YOUR DATA</h2> {/* Título de la sección */}

          {/* Campo de Email */}
          <div className="input-group">
            <label>EMAIL</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} // Actualiza el estado del email
            />
          </div>

          {/* Campo de Password */}
          <div className="input-group">
            <label>PASSWORD</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de la contraseña
              className="password-input"
            />
          </div>

          {/* Campo de Número de Teléfono */}
          <div className="input-group">
            <label>PHONE NUMBER</label>
            <input 
              type="text" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} // Actualiza el estado del teléfono
            />
          </div>

          {/* Botón para cambiar credenciales */}
          <button className="change-button">CHANGE CREDENTIALS</button>
        </div>
        
        {/* Sección de perfil del usuario */}
        <div className="profile-section">
          <img src="/src/img/Users.png" alt="Logo" />
          <h2>CARLOS DANIEL</h2> {/* Nombre del usuario */}

          {/* Información del usuario */}
          <div className="profile-item">
              <img src="/src/img/Face.png" alt="Logo" />
            <p>CARLOS DANIEL BONILLA MENDEZ</p>
          </div>
          <div className="profile-item">
            <img src="/src/img/Calendar.png" alt="" />
            <p>01/10/1992</p>
          </div>
          <div className="profile-item">
            <img src="/src/img/@.png" alt="" />
            <p>DANIELBONILLA@GMAIL.COM</p>
          </div>
          <div className="profile-item">
                <img src="/src/img/Phone.png" alt="" />
            <p>+503 76561893</p>
          </div>
          <div className="profile-item">
                  <img src="/src/img/Lock.png" alt="" />
            <p>********</p> {/* Contraseña oculta */}
          </div>
        </div>
      </div>

      {/* Botón de logout */}
      <button className="logout-button" onClick={() => navigate("/login")}>
        LOGOUT
      </button>
    </div>
    </div>
    
  );
}
