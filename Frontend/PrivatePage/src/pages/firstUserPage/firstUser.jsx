import React from "react";
import { useNavigate } from "react-router-dom";
import "./firstUser.css";

export default function FirstUserPage() {
    const navigate = useNavigate();

    return (
        <div className="first-user-page">
            <div className="overlay">
                <div className="content">
                    <h1 className="welcome-text">WELCOME TO SCUFFERS</h1>
                    {/* Botón START ahora lleva a Login correctamente */}
                    <button className="start-button" onClick={() => navigate("/Login")}>
                        START
                    </button>
                </div>
            </div>
        </div>
    );
}
