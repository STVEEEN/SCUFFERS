import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useResendVerification from "../../hooks/useResendVerification";
import Swal from "sweetalert2";
import "./VerifyEmail.css";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const [status, setStatus] = useState(token ? "pending" : "no-token");

  // Para reenvío de verificación
  const [email, setEmail] = useState("");
  const { loading, error, success, resend } = useResendVerification();

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/authUser/verify-email?token=${token}`);
          if (!response.ok) throw new Error();
          setStatus("success");
        } catch {
          setStatus("error");
        }
      })();
    }
  }, [token]);

  useEffect(() => {
    if (success) {
      Swal.fire({
        icon: "success",
        title: "¡Correo reenviado!",
        text: "Revisa tu bandeja de entrada o spam.",
        background: "#fff",
        color: "#232323",
        confirmButtonColor: "#7c3aed"
      });
    }
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
        background: "#fff",
        color: "#232323",
        confirmButtonColor: "#7c3aed"
      });
    }
  }, [success, error]);

  const renderIcon = () => (
    <svg className="ve-icon ve-icon-info" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="24" />
      <rect x="30" y="26" width="4" height="12" rx="2" />
      <rect x="30" y="22" width="4" height="4" rx="2" />
    </svg>
  );

  return (
    <div className="ve-bg">
      <div className="ve-card">
        {status === "pending" && (
          <>
            {renderIcon()}
            <h2>Verificando tu correo...</h2>
            <p className="ve-desc">Estamos verificando tu cuenta.<br />Por favor, espera un momento.</p>
            <div className="ve-loader"></div>
          </>
        )}

        {status === "success" && (
          <>
            {renderIcon()}
            <h2>¡Correo verificado!</h2>
            <p className="ve-desc">Tu cuenta ha sido activada correctamente.<br />Ahora puedes iniciar sesión.</p>
            <button className="ve-btn" onClick={() => navigate("/login-and-register")}>
              Iniciar sesión
            </button>
          </>
        )}

        {(status === "error" || status === "no-token") && (
          <>
            {renderIcon()}
            <h2>{status === "error" ? "Enlace inválido o expirado" : "Acceso inválido"}</h2>
            <p className="ve-desc">Solicita un nuevo correo de verificación.</p>
            <input
              type="email"
              placeholder="Ingresa tu email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="ve-input"
              autoFocus
            />
            <button className="ve-btn" onClick={() => resend(email)} disabled={loading}>
              {loading ? "Enviando..." : "Reenviar correo"}
            </button>
            <button className="ve-btn-secondary" onClick={() => navigate("/login-and-register")}>
              Volver al inicio
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;