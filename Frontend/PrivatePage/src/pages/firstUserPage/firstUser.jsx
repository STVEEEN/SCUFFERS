import React from "react";
import { useNavigate } from "react-router-dom";
import "./firstUser.css";

export default function FirstUserPage() {
    const navigate = useNavigate();

    return (
        <div className="firstUser-page">
            <div className="firstUser-overlay">
                <div className="firstUser-content">
                    <h1 className="firstUser-welcome-text">WELCOME TO SCUFFERS</h1>
                    <button className="firstUser-start-button" onClick={() => navigate("/Login")}>
                        START
                    </button>
                </div>
            </div>
        </div>
    );
}
