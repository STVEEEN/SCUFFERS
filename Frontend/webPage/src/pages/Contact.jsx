import React, { useState } from 'react';
import '../styles/styles.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    setStatus('Message sent!');
  };

  return (
    <div className="contact-page container">
      <h1>Contact Us</h1>
      <form onSubmit={sendMessage} className="contact-form">
        <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="contact-input"/>
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="contact-input"/>
        <textarea placeholder="Message" value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} className="contact-textarea"></textarea>
        <button type="submit" className="contact-submit">Send</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
}
