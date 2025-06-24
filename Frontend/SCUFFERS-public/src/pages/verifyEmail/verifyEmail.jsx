import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./VerifyEmail.css";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const [status, setStatus] = useState(token ? "pending" : "no-token"); // pending, success, error, no-token

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

  if (status === "pending") {
    return (
      <div className="verify-email__wrapper">
        <div className="verify-email__card">
          <h2>Verificando tu correo...</h2>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="verify-email__wrapper">
        <div className="verify-email__card">
          <h2>¡Correo verificado!</h2>
          <p>Tu cuenta ha sido activada correctamente.</p>
          <button onClick={() => navigate("/login-and-register")}>
            Iniciar sesión
          </button>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="verify-email__wrapper">
        <div className="verify-email__card">
          <h2>Enlace inválido o expirado</h2>
          <p>Solicita un nuevo correo de verificación.</p>
          <button onClick={() => navigate("/login-and-register")}>
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  // Si entra sin token
  return (
    <div className="verify-email__wrapper">
      <div className="verify-email__card">
        <h2>Acceso inválido</h2>
        <button onClick={() => navigate("/login-and-register")}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;