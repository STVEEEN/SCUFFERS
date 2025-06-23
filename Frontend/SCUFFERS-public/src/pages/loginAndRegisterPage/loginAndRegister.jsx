// src/pages/LoginAndRegister/LoginAndRegister.jsx

import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import "./LoginAndRegister.css";

const LoginAndRegister = () => {
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

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = Array.from({ length: 106 }, (_, i) => 2025 - i);

  return (
    <div className="login-register-page">
      <Navbar />
      <div className="main-content">
        <Sidebar />

        {/* Login */}
        <div className="login-form-container">
          <form onSubmit={handleSubmit} className="login-form">
            <h2 className="form-title">LOGIN</h2>

            <label className="form-label">EMAIL</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label className="form-label">PASSWORD</label>
            <input
              type="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <div className="form-row">
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                />
                <span>REMEMBER ME</span>
              </label>
              <a href="#" className="forgot-password">
                FORGOT PASSWORD?
              </a>
            </div>

            <button type="submit" className="login-btn">
              LOGIN
            </button>
          </form>
        </div>

        {/* Registro */}
        <div className="register-form-container">
          <form className="register-form">
            <h2 className="form-title">NEW CUSTOMER</h2>

            <label className="form-label">EMAIL</label>
            <input type="email" className="form-input" required />

            <label className="form-label">PASSWORD</label>
            <input type="password" className="form-input" required />

            <label className="form-label">CONFIRM PASSWORD</label>
            <input type="password" className="form-input" required />

            <label className="form-label">BIRTHDATE</label>
            <div className="birthdate-selects">
              <select className="birth-select" required>
                <option value="">Day</option>
                {days.map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>

              <select className="birth-select" required>
                <option value="">Month</option>
                {months.map((month, index) => (
                  <option key={month} value={index + 1}>{month}</option>
                ))}
              </select>

              <select className="birth-select" required>
                <option value="">Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div className="terms-row">
              <input type="checkbox" required />
              <label className="terms-label">
                I read and accept the <span className="underline">terms and conditions</span>
              </label>
            </div>

            <button type="submit" className="register-btn">
              CREATE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAndRegister;
