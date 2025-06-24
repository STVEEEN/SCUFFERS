import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMyProfile from "../../hooks/useMyProfile";
import Swal from "sweetalert2";
import "./Settings.css";

// Componente que permite ver, editar y actualizar la información del perfil,
// cambiar contraseña (si es admin) y cerrar sesión.
export default function Settings() {
  const navigate = useNavigate();
  const { profile, loading, error, updateProfile } = useMyProfile();

  // Estados del formulario
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dui, setDui] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [hireDate, setHireDate] = useState("");

  // Cambio de contraseña
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  // Cargar datos del perfil
  useEffect(() => {
    if (profile) {
      setEmail(profile.email || "");
      setPhone(profile.phoneNumber || "");
      setDui(profile.dui || "");
      setAddress(profile.address || "");
      setBirthday(profile.birthday?.substring(0, 10) || "");
      setName(profile.name || "");
      setRole(profile.Role || profile.role || "");
      setHireDate(profile.hireDate?.substring(0, 10) || "");
    }
  }, [profile]);

  // Confirmar cierre de sesión
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Se cerrará tu sesión actual.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
    });
    if (result.isConfirmed) {
      await fetch("http://localhost:4000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userId");
      navigate("/login");
    }
  };

  // Guardar cambios en perfil
  const handleSave = async (e) => {
    e.preventDefault();
    const updates = {
      email,
      phoneNumber: phone,
      dui,
      address,
      birthday,
      name,
    };
    const result = await updateProfile(updates);
    if (result.success) {
      Swal.fire("¡Éxito!", "Datos actualizados correctamente.", "success");
    } else {
      Swal.fire("Error", result.error || "No se pudo actualizar.", "error");
    }
  };

  // Cambio de contraseña
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (role === "Admin") {
      if (!newPassword || newPassword.length < 6) {
        Swal.fire("Atención", "La contraseña debe tener al menos 6 caracteres.", "warning");
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

        Swal.fire("Éxito", "Contraseña actualizada correctamente.", "success");
        setNewPassword("");
        setShowPasswordInput(false);
      } catch (err) {
        Swal.fire("Error", err.message || "Algo salió mal.", "error");
      }
    } else {
      navigate("/passwordRecovery");
    }
  };

  if (loading) return <div className="settings-page"><p>Cargando...</p></div>;
  if (error) return <div className="settings-page"><p>{error}</p></div>;

  return (
    <div className="Settings-page">
      <div className="back-arrow" onClick={() => navigate("/stats")}>
        <img src="/src/img/Flecha.png" />
      </div>
      <div className="logo-container">
        <img src="/src/img/Logo.png" alt="Logo" />
      </div>
      <div className="settings-page">
        <div className="container">
          <div style={{ width: "45%" }}>
            <form className="data-section" onSubmit={handleSave}>
              <h2>CHANGE YOUR DATA</h2>
              <div className="input-group"><label>NAME</label><input type="text" value={name} onChange={e => setName(e.target.value)} /></div>
              <div className="input-group"><label>EMAIL</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
              <div className="input-group"><label>PHONE NUMBER</label><input type="text" value={phone} onChange={e => setPhone(e.target.value)} /></div>
              <div className="input-group"><label>DUI</label><input type="text" value={dui} onChange={e => setDui(e.target.value)} /></div>
              <div className="input-group"><label>ADDRESS</label><input type="text" value={address} onChange={e => setAddress(e.target.value)} /></div>
              <div className="input-group"><label>BIRTHDAY</label><input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} /></div>
              <div className="input-group">
                <label>ROLE</label>
                <input type="text" value={role} disabled style={{ background: "#eee", color: "#666", cursor: "not-allowed" }} />
              </div>
              <button className="change-button" type="submit">CHANGE CREDENTIALS</button>
            </form>
                        {/* Sección de cambio de contraseña */}
                        <div className="password-section">
              <h3 style={{ marginTop: 30 }}>CAMBIAR CONTRASEÑA</h3>
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
                    <button className="change-button" style={{ background: "#ff6600", marginTop: 10 }} type="submit">
                      GUARDAR CONTRASEÑA
                    </button>
                    <button
                      type="button"
                      className="change-button"
                      style={{ background: "#888", marginTop: 10, marginLeft: 8 }}
                      onClick={() => { setShowPasswordInput(false); setNewPassword(""); }}
                    >
                      CANCELAR
                    </button>
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
                  <span style={{ fontSize: 12, color: "#888", textAlign: "center", display: "block", marginTop: 6 }}>
                    Solo el admin puede cambiar la contraseña aquí. Haz clic para ir a recuperación.
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Vista de perfil del usuario */}
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
              <img src="/src/img/Lock.png" alt="Password" />
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
              <img src="/src/img/Role.png" alt="Role" />
              <p>{role}</p>
            </div>
          </div>
        </div>

        {/* Botón para cerrar sesión */}
        <button className="logout-button" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>
    </div>
  );
}
