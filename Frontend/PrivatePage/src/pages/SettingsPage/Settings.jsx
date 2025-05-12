import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

export default function Settings() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="settings-page">
      {/* Contenido principal */}
      <div className="container">
        <div className="data-section">
          <h2>CHANGE YOUR DATA</h2>
          <div className="input-group">
            <label>EMAIL</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label>PASSWORD</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="password-input" />
          </div>
          <div className="input-group">
            <label>PHONE NUMBER</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <button className="change-button">CHANGE CREDENTIALS</button>
        </div>
        
        {/* Perfil del usuario */}
        <div className="profile-section">
          <div className="profile-icon"></div>
          <h2>CARLOS DANIEL</h2>
          <div className="profile-item"><div className="icon-placeholder"></div><p>CARLOS DANIEL BONILLA MENDEZ</p></div>
          <div className="profile-item"><div className="icon-placeholder"></div><p>01/10/1992</p></div>
          <div className="profile-item"><div className="icon-placeholder"></div><p>DANIELBONILLA@GMAIL.COM</p></div>
          <div className="profile-item"><div className="icon-placeholder"></div><p>+503 76561893</p></div>
          <div className="profile-item"><div className="icon-placeholder"></div><p>********</p></div>
        </div>
      </div>

      {/* Botón de logout */}
      <button className="logout-button" onClick={() => navigate("/login")}>LOGOUT</button>
    </div>
  );
}
