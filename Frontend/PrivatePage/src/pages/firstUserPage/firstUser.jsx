import React from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook para la navegación
import "./firstUser.css"; // Importa los estilos CSS

export default function FirstUserPage() {
    const navigate = useNavigate(); // Hook para redirigir a otra página

    return (
        <div className="firstUser-page"> {/* Contenedor principal de la página */}
            <div className="firstUser-overlay"> {/* Capa de fondo con efecto de superposición */}
                <div className="firstUser-content"> {/* Contenedor del contenido central */}
                    <h1 className="firstUser-welcome-text">WELCOME TO SCUFFERS</h1> {/* Texto de bienvenida */}
                    <button 
                        className="firstUser-start-button" 
                        onClick={() => navigate("/Login")} // Redirige a la página de Login al hacer clic
                    >
                        START
                    </button>
                </div>
            </div>
        </div>
    );
}
