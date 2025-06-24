// src/pages/LoginAndRegister/LoginAndRegister.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import "./LoginAndRegister.css";

const LoginAndRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", formData);
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    navigate("/recover");
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = Array.from({ length: 106 }, (_, i) => 2025 - i);

  return (
    <div className="loginRegister-page">
      <Navbar />
      <div className="loginRegister-main-content">
        <Sidebar />

        {/* Login */}
        <div className="loginRegister-login-container">
          <form onSubmit={handleSubmit} className="loginRegister-login-form">
            <h2 className="loginRegister-form-title">LOGIN</h2>

            <label className="loginRegister-form-label">EMAIL</label>
            <input
              type="email"
              name="email"
              className="loginRegister-form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label className="loginRegister-form-label">PASSWORD</label>
            <input
              type="password"
              name="password"
              className="loginRegister-form-input"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <div className="loginRegister-form-row">
              <label className="loginRegister-checkbox">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                <span>REMEMBER ME</span>
              </label>
              <a
                href="#"
                className="loginRegister-forgot-password"
                onClick={handleForgotPasswordClick}
              >
                FORGOT PASSWORD?
              </a>
            </div>

            <button type="submit" className="loginRegister-login-btn">
              LOGIN
            </button>
          </form>
        </div>

        {/* Registro */}
        <div className="loginRegister-register-container">
          <form className="loginRegister-register-form">
            <h2 className="loginRegister-form-title">NEW CUSTOMER</h2>

            <label className="loginRegister-form-label">EMAIL</label>
            <input type="email" className="loginRegister-form-input" required />

            <label className="loginRegister-form-label">PASSWORD</label>
            <input type="password" className="loginRegister-form-input" required />

            <label className="loginRegister-form-label">CONFIRM PASSWORD</label>
            <input type="password" className="loginRegister-form-input" required />

            <label className="loginRegister-form-label">BIRTHDATE</label>
            <div className="loginRegister-birthdate-selects">
              <select className="loginRegister-birth-select" required>
                <option value="">Day</option>
                {days.map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>

              <select className="loginRegister-birth-select" required>
                <option value="">Month</option>
                {months.map((month, index) => (
                  <option key={month} value={index + 1}>{month}</option>
                ))}
              </select>

              <select className="loginRegister-birth-select" required>
                <option value="">Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div className="loginRegister-terms-row">
              <input type="checkbox" required />
              <label className="loginRegister-terms-label">
                I read and accept the <span className="loginRegister-underline">terms and conditions</span>
              </label>
            </div>

            <button type="submit" className="loginRegister-register-btn">
              CREATE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAndRegister;
