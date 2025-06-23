import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./PasswordRecovery.css";

export default function PasswordRecovery() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Valida formato de correo electrónico
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const handleRecovery = async () => {
    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Missing email",
        text: "Please enter your email.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }
    if (!validateEmail(email)) {
      Swal.fire({
        icon: "warning",
        title: "Invalid email",
        text: "Please enter a valid email address.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/passwordRecovery/requestCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok && data.message && data.message.toLowerCase().includes("enviado")) {
        await Swal.fire({
          icon: "success",
          title: "Code sent!",
          text: "Check your email for the recovery code.",
          confirmButtonColor: "#3085d6",
        });
        navigate("/codeConfirmation", { state: { email } });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Could not send recovery code. Try again.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Server error",
        text: "Please try again later.",
        confirmButtonColor: "#d33",
      });
    }
    setLoading(false);
  };

  return (
    <div className="password-recovery-page">
      <div className="back-arrow" onClick={() => navigate("/login")}>
        <img src="/src/img/Flecha.png" alt="Back" />
      </div>
      <div className="logo-container">
        <img src="/src/img/Logo.png" alt="Logo" />
      </div>
      <div className="recovery-container">
        <div className="recovery-form">
          <h2>RECOVER YOUR ACCOUNT</h2>
          <p className="label-text">ENTER YOUR EMAIL</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="recovery-input"
            autoFocus
          />
          <p className="notification-text">
            WE MAY SEND YOU NOTIFICATIONS TO YOUR<br />
            EMAIL FOR SECURITY AND LOGIN PURPOSES.
          </p>
          <button className="recovery-button" onClick={handleRecovery} disabled={loading}>
            {loading ? "SENDING..." : "CONTINUE"}
          </button>
        </div>
      </div>
    </div>
  );
}