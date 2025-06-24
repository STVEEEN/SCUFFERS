import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import "./PasswordRecovery.css";

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recovery email:", email);
    // Aquí podrías manejar el envío del email
  };

  return (
    <div className="password-recovery-page">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <div className="recovery-form-container">
          <form onSubmit={handleSubmit} className="recovery-form">
            <h2 className="form-title">FORGOT PASSWORD?</h2>
            <p className="form-description">
              Enter your email address and we’ll send you instructions to reset your password.
            </p>

            <label className="form-label">EMAIL</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" className="recovery-btn">
              RESET MY PASSWORD
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;
