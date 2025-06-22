import { Link } from "react-router-dom"; // Importa el componente Link para la navegación
import "./Navbar.css"; // Importa los estilos CSS

export default function Navbar() {
  return (
    <nav className="navbar"> {/* Contenedor principal de la barra de navegación */}
      {/* Logo de la barra de navegación con enlace a la página principal */}
      <Link to="/" className="nav-logo">SCUFFERS</Link>

      {/* Contenedor de los enlaces de navegación */}
      <div className="nav-links">
        <Link to="/login">Login</Link> {/* Enlace a la página de inicio de sesión */}
        <Link to="/recovery">Recovery</Link> {/* Enlace a la página de recuperación de contraseña */}
        <Link to="/confirmation">Confirmation</Link> {/* Enlace a la página de confirmación */}
      </div>
    </nav>
  );
}
