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
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [hireDate, setHireDate] = useState(""); // solo para mostrar
  const [message, setMessage] = useState("");

  // Cambio de contraseña solo para Admin
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  useEffect(() => {
    if (profile) {
      setEmail(profile.email || "");
      setPhone(profile.phoneNumber || "");
      setDui(profile.dui || "");
      setAddress(profile.address || "");
      setBirthday(profile.birthday ? profile.birthday.substring(0, 10) : "");
      setName(profile.name || "");
      setRole(profile.Role || profile.role || "");
      setHireDate(profile.hireDate ? profile.hireDate.substring(0, 10) : "");
    }
  }, [profile]);

  // Logout funcional
  const handleLogout = async () => {
    await fetch("http://localhost:4000/api/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  // Guardar cambios de datos personales
  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    const updates = {
      email,
      phoneNumber: phone,
      dui,
      address,
      birthday,
      name,
      // No actualices role, hireDate ni password aquí
    };
    const result = await updateProfile(updates);
    if (result.success) setMessage("Datos actualizados correctamente");
    else setMessage(result.error || "Error al actualizar datos");
  };

  // Cambiar contraseña: Admin puede, otros redirige
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMessage("");
    if (role === "Admin") {
      if (!newPassword || newPassword.length < 6) {
        setPasswordMessage("La contraseña debe tener al menos 6 caracteres.");
        return;
      }
      try {
        const res = await fetch("http://localhost:4000/api/employees/me/change-password", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ newPassword }),
        });
        if (!res.ok) throw new Error("No se pudo cambiar la contraseña");
        setPasswordMessage("Contraseña cambiada correctamente.");
        setNewPassword("");
        setShowPasswordInput(false);
      } catch (err) {
        setPasswordMessage(err.message || "Error al cambiar contraseña.");
      }
    } else {
      navigate("/passwordRecovery");
    }
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
          <div style={{ width: "45%" }}>
            <form className="data-section" onSubmit={handleSave}>
              <h2>CHANGE YOUR DATA</h2>

              <div className="input-group">
                <label>NAME</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
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
                <label>ROLE</label>
                <input
                  type="text"
                  value={role}
                  disabled
                  style={{ background: "#eee", color: "#666", cursor: "not-allowed" }}
                />
              </div>
              <button className="change-button" type="submit">CHANGE CREDENTIALS</button>
              {message && (
                <p style={{ marginTop: 10, color: message.includes("error") ? "red" : "green" }}>
                  {message}
                </p>
              )}
            </form>
            {/* Miniformulario de cambio de contraseña */}
            <div className="password-section">
              <h3 style={{ marginTop: 30,}}>CAMBIAR CONTRASEÑA</h3>
              {role === "Admin" ? (
                !showPasswordInput ? (
                  <button
                    className="change-button"
                    style={{ background: "#ff6600", margin: "20px auto 0 auto", display: "block" }}
                    type="button"
                    onClick={() => setShowPasswordInput(true)}
                  >
                    CAMBIAR CONTRASEÑA
                  </button>
                ) : (
                  <form onSubmit={handlePasswordChange} style={{ marginTop: 18 }}>
                    <div className="input-group" style={{ width: "80%" }}>
                      <label>NUEVA CONTRASEÑA</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <button
                      className="change-button"
                      style={{ background: "#ff6600", marginTop: 10 }}
                      type="submit"
                    >
                      GUARDAR CONTRASEÑA
                    </button>
                    <button
                      type="button"
                      className="change-button"
                      style={{ background: "#888", marginTop: 10, marginLeft: 8 }}
                      onClick={() => { setShowPasswordInput(false); setNewPassword(""); setPasswordMessage(""); }}
                    >
                      CANCELAR
                    </button>
                    {passwordMessage && (
                      <p style={{ marginTop: 10, color: passwordMessage.includes("correcta") ? "green" : "red" }}>
                        {passwordMessage}
                      </p>
                    )}
                  </form>
                )
              ) : (
                <>
                  <button
                    className="change-button"
                    style={{ background: "#ff6600", margin: "20px auto 0 auto", display: "block" }}
                    type="button"
                    onClick={handlePasswordChange}
                  >
                    RECUPERAR CONTRASEÑA
                  </button>
                  <span style={{ fontSize: 12, color: "#888", display: "block", textAlign: "center", marginTop: 6 }}>
                    Solo el admin puede cambiar la contraseña aquí. Haz click para ir a recuperación de contraseña.
                  </span>
                </>
              )}
            </div>
          </div>
          {/* Sección de perfil del usuario */}
          <div className="profile-section">
            <img src="/src/img/Users.png" alt="User" />
            <h2>{name}</h2>
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