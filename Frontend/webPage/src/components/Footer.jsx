import React from 'react';
import '../styles/styles.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Scuffers. All rights reserved.</p>
    </footer>
  );
}
