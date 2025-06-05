import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("INVALID DATA");
      return;
    }
    if (!email.includes("@gmail.com")) {
      setErrorMessage("INVALID EMAIL FORMAT");
      return;
    }

    const result = await login(email, password);

    if (!result.success) {
      setErrorMessage(result.message || "LOGIN FAILED");
      return;
    }

     if (result.role === 'Admin' || result.role === 'Gerente') {
       navigate("/Stats");
    } else {
       navigate("/Products");
     }
  };

  return (
    <div className="login-page">
      <div className="back-arrow" onClick={() => navigate("/")}>
        <img src="/src/img/Flecha.png" />
      </div>
      <div className="logo-container">
        <img src="/src/img/Logo.png" alt="Logo" />
      </div>
      <div className="login-container">
        <div className="login-image"></div>
        <div className="login-form">
          <h2>
            LOGIN WITH YOUR <br /> CREDENTIALS
          </h2>
          <input
            type="email"
            placeholder="EMAIL"
            value={email}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => {
              if (e.target.value === "") e.target.placeholder = "EMAIL";
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
           type="password" // <-- cambia de "text" a "password"
           placeholder="PASSWORD"
           value={password}
           onFocus={(e) => {
           if (e.target.value === "PASSWORD") setPassword("");
           }}
           onBlur={(e) => {
           if (e.target.value === "") setPassword("PASSWORD");
           }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="/passwordRecovery" className="forgot-password">
            Forgot your password?
          </a>
          <button className="start-buttonLogin" onClick={handleLogin}>
            START
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}