import React, { useState } from 'react';
import '../styles/styles.css';

export default function Login() {
  const [mode, setMode] = useState('login');

  return (
    <div className="login-page container">
      <div className="auth-toggle">
        <button onClick={() => setMode('login')} className={mode === 'login' ? 'active' : ''}>Login</button>
        <button onClick={() => setMode('register')} className={mode === 'register' ? 'active' : ''}>Register</button>
      </div>
      <form className="auth-form">
        {mode === 'register' && (
          <input type="text" placeholder="Name" className="auth-input"/>
        )}
        <input type="email" placeholder="Email" className="auth-input"/>
        <input type="password" placeholder="Password" className="auth-input"/>
        <button className="auth-submit">Submit</button>
      </form>
    </div>
  );
}
