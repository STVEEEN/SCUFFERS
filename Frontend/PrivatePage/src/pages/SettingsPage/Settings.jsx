import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMyProfile from "../../hooks/useMyProfile";
import "./Settings.css";

export default function Settings() {
  const navigate = useNavigate();
  const { profile, loading, error, updateProfile } = useMyProfile();

  // Estados para los campos editables
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dui, setDui] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (profile) {
      setEmail(profile.email || "");
      setPhone(profile.phoneNumber || "");
      setDui(profile.dui || "");
      setAddress(profile.address || "");
      setBirthday(profile.birthday ? profile.birthday.substring(0, 10) : "");
      setHireDate(profile.hireDate ? profile.hireDate.substring(0, 10) : "");
      setName(profile.name || "");
      setFullName(profile.fullName || "");
      setRole(profile.Role || profile.role || "");
    }
  }, [profile]);

  // --- Logout funcional
  const handleLogout = async () => {
    await fetch("http://localhost:4000/api/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  // --- Cambiar contraseña: admin cambia aquí, otros redirige a recuperación
  const handlePasswordChange = () => {
    if (role === "Admin") {
      // Aquí iría el fetch real de cambio de contraseña (implementa tu lógica real)
      setMessage("Función para cambiar la contraseña de admin (implementa tu lógica aquí)");
    } else {
      navigate("/passwordRecovery"); // O el link que prefieras
    }
  };

  // --- Guardar cambios de datos personales
  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    const updates = {
      email,
      phoneNumber: phone,
      dui,
      address,
      birthday,
      hireDate,
      name,
      fullName,
      // No actualices role ni password aquí
    };
    const result = await updateProfile(updates);
    if (result.success) setMessage("Datos actualizados correctamente");
    else setMessage(result.error || "Error al actualizar datos");
  };

  if (loading) return <div className="settings-page"><p>Cargando...</p></div>;
  if (error) return <div className="settings-page"><p>{error}</p></div>;

  return (
    <div className="Settings-page">
      {/* Flecha en la esquina superior izquierda */}
      <div className="back-arrow" onClick={() => navigate("/stats")}>
        <img src="/src/img/Flecha.png" />
      </div>

      {/* Contenedor del logo */}
      <div className="logo-container">
        <img src="/src/img/Logo.png" alt="Logo" />
      </div>

      <div className="settings-page">
        <div className="container">
          {/* Sección para cambiar datos */}
          <form className="data-section" onSubmit={handleSave}>
            <h2>CHANGE YOUR DATA</h2>

            <div className="input-group">
              <label>NAME</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="input-group">
              <label>FULL NAME</label>
              <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} />
            </div>
            <div className="input-group">
              <label>EMAIL</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="input-group">
              <label>PHONE NUMBER</label>
              <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div className="input-group">
              <label>DUI</label>
              <input type="text" value={dui} onChange={e => setDui(e.target.value)} />
            </div>
            <div className="input-group">
              <label>ADDRESS</label>
              <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
            </div>
            <div className="input-group">
              <label>BIRTHDAY</label>
              <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
            </div>
            <div className="input-group">
              <label>HIRE DATE</label>
              <input type="date" value={hireDate} onChange={e => setHireDate(e.target.value)} />
            </div>
            <div className="input-group">
              <label>ROLE</label>
              <input
                type="text"
                value={role}
                disabled
                style={{ background: "#eee", color: "#666", cursor: "not-allowed" }}
              />
            </div>
            <div className="input-group">
              <label>PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="password-input"
                disabled={role !== "Admin"}
              />
            </div>

            <button className="change-button" type="submit">CHANGE CREDENTIALS</button>

            <button
              className="change-button"
              style={{ background: "#ff6600", marginTop: 10 }}
              type="button"
              onClick={handlePasswordChange}
            >
              {role === "Admin"
                ? "CHANGE PASSWORD"
                : "RECOVER PASSWORD"}
            </button>
            {role !== "Admin" && (
              <span style={{ fontSize: 12, color: "#888" }}>
                Solo el admin puede cambiar la contraseña aquí. Haz click para ir a recuperación de contraseña.
              </span>
            )}

            {message && (
              <p style={{ marginTop: 10, color: message.includes("error") ? "red" : "green" }}>
                {message}
              </p>
            )}
          </form>
          
          {/* Sección de perfil del usuario */}
          <div className="profile-section">
            <img src="/src/img/Users.png" alt="User" />
            <h2>{name}</h2>
            <div className="profile-item">
              <img src="/src/img/Face.png" alt="Face" />
              <p>{fullName}</p>
            </div>
            <div className="profile-item">
              <img src="/src/img/Calendar.png" alt="Calendar" />
              <p>{birthday ? birthday.split("-").reverse().join("/") : ""}</p>
            </div>
            <div className="profile-item">
              <img src="/src/img/@.png" alt="Email" />
              <p>{email}</p>
            </div>
            <div className="profile-item">
              <img src="/src/img/Phone.png" alt="Phone" />
              <p>{phone}</p>
            </div>
            <div className="profile-item">
              <img src="/src/img/Lock.png" alt="Lock" />
              <p>********</p>
            </div>
            <div className="profile-item">
              <img src="/src/img/Map.png" alt="Address" />
              <p>{address}</p>
            </div>
            <div className="profile-item">
              <img src="/src/img/ID.png" alt="DUI" />
              <p>{dui}</p>
            </div>
            <div className="profile-item">
              <img src="/src/img/Work.png" alt="Hire Date" />
              <p>{hireDate ? hireDate.split("-").reverse().join("/") : ""}</p>
            </div>
            <div className="profile-item">
              <img src="/src/img/Role.png" alt="Role" />
              <p>{role}</p>
            </div>
          </div>
        </div>
        {/* Botón de logout funcional */}
        <button className="logout-button" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>
    </div>
  );
}