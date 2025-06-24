import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import Sidebar from "../../components/sidebar/sidebar";
import useLogin from "../../hooks/useLogin";
import useRegister from "../../hooks/useRegister";
import "./LoginAndRegister.css";

const LoginAndRegister = () => {
  // LOGIN STATE
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  // REGISTER STATE
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    acceptTerms: false,
    phoneNumber: "",
  });

  // HOOKS
  const { loading: loginLoading, error: loginError, login } = useLogin();
  const { loading: regLoading, error: regError, success: regSuccess, register } = useRegister();
  const navigate = useNavigate();

  // Cambios login
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Cambios registro
  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Submit login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);
    if (result.success) {
      // Redirige o guarda usuario, según tu flujo
      navigate("/"); // Ejemplo
    } else if (result.message === "Debes verificar tu correo para iniciar sesión.") {
      navigate("/verify-email", { state: { email: formData.email } });
    }
  };

  // Submit registro
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Calcula edad
    const birthDate = new Date(
      registerData.birthYear,
      registerData.birthMonth - 1,
      registerData.birthDay
    );
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    const ok = await register(registerData, age);
    if (ok) navigate("/verify-email", { state: { email: registerData.email } });
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
          <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
            <h2 className="form-title">LOGIN</h2>

            <label className="form-label">EMAIL</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="off"
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

            {loginError && <div className="form-error">{loginError}</div>}

            <button type="submit" className="login-btn" disabled={loginLoading}>
              {loginLoading ? "..." : "LOGIN"}
            </button>
          </form>
        </div>

        {/* Registro */}
        <div className="register-form-container">
          <form className="register-form" onSubmit={handleRegisterSubmit} autoComplete="off">
            <h2 className="form-title">NEW CUSTOMER</h2>

            <label className="form-label">NAME</label>
            <input
              type="text"
              className="form-input"
              name="name"
              value={registerData.name}
              onChange={handleRegisterChange}
              required
              autoComplete="off"
            />

            <label className="form-label">GENDER</label>
            <select
              className="form-input"
              name="gender"
              value={registerData.gender}
              onChange={handleRegisterChange}
              required
            >
              <option value="">Select</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Other">Other</option>
            </select>

            <label className="form-label">EMAIL</label>
            <input
              type="email"
              className="form-input"
              name="email"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
              autoComplete="off"
            />

            <label className="form-label">PHONE NUMBER</label>
            <input
              type="text"
              className="form-input"
              name="phoneNumber"
              value={registerData.phoneNumber}
              onChange={handleRegisterChange}
              placeholder="2222-2222"
              required
              autoComplete="off"
            />

            <label className="form-label">PASSWORD</label>
            <input
              type="password"
              className="form-input"
              name="password"
              value={registerData.password}
              onChange={handleRegisterChange}
              required
            />

            <label className="form-label">CONFIRM PASSWORD</label>
            <input
              type="password"
              className="form-input"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              required
            />

            <label className="form-label">BIRTHDATE</label>
            <div className="birthdate-selects">
              <select
                className="birth-select"
                name="birthDay"
                value={registerData.birthDay}
                onChange={handleRegisterChange}
                required
              >
                <option value="">Day</option>
                {days.map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>

              <select
                className="birth-select"
                name="birthMonth"
                value={registerData.birthMonth}
                onChange={handleRegisterChange}
                required
              >
                <option value="">Month</option>
                {months.map((month, index) => (
                  <option key={month} value={index + 1}>{month}</option>
                ))}
              </select>

              <select
                className="birth-select"
                name="birthYear"
                value={registerData.birthYear}
                onChange={handleRegisterChange}
                required
              >
                <option value="">Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div className="terms-row">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={registerData.acceptTerms}
                onChange={handleRegisterChange}
                required
              />
              <label className="terms-label">
                I read and accept the <span className="underline">terms and conditions</span>
              </label>
            </div>

            {regError && <div className="form-error">{regError}</div>}

            <button type="submit" className="register-btn" disabled={regLoading}>
              {regLoading ? "..." : "CREATE"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAndRegister;