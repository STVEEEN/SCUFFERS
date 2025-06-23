import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./NewPassword.css";

export default function NewPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Expresión regular para validar los requisitos de la contraseña
  const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

  // Envío de la nueva contraseña al backend
  const handleContinue = async () => {
    if (!password || !confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please fill in both fields.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        text: "Please make sure both passwords are the same.",
        confirmButtonColor: "#d33",
      });
      return;
    }
    if (!passwordRequirements.test(password)) {
      Swal.fire({
        icon: "warning",
        title: "Weak password",
        html: "Your password must contain at least 12 characters, including:<br>- Special characters<br>- Uppercase and lowercase letters",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/passwordRecovery/newPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Necesario para enviar la cookie del token temporal
        body: JSON.stringify({ newPassword: password })
      });
      const data = await res.json();
      if (res.ok) {
        await Swal.fire({
          icon: "success",
          title: "Password changed!",
          text: "Your password has been successfully updated.",
          confirmButtonColor: "#3085d6",
        });
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "Could not update password. Try again.",
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
    <div className="new-password-page">
      <div className="back-arrow" onClick={() => navigate("/codeConfirmation")}>
        <img src="/src/img/Flecha.png" alt="Back" />
      </div>

      <div className="logo-container">
        <img src="/src/img/Logo.png" alt="Logo" />
      </div>
      <div className="password-container">
        <div className="password-form">
          <h2>CREATE A NEW PASSWORD</h2>
          <p className="instruction-text">
            Your password must contain at least 12 characters, including:<br />
            - Special characters<br />
            - Uppercase and lowercase letters
          </p>
          <input
            type="password"
            placeholder="NEW PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="password-input"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="CONFIRM PASSWORD"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="password-input"
            disabled={loading}
          />
          <button className="continue-button" onClick={handleContinue} disabled={loading}>
            {loading ? "SAVING..." : "CONTINUE"}
          </button>
        </div>
      </div>
    </div>
  );
}