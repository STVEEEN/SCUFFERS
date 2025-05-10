import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">SCUFFERS</Link>
      <div className="nav-links">
        <Link to="/login">Login</Link>
        <Link to="/recovery">Recovery</Link>
        <Link to="/confirmation">Confirmation</Link>
      </div>
    </nav>
  );
}
