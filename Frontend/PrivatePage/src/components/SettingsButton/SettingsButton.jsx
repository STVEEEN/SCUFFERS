import React from "react";
import { useNavigate } from "react-router-dom";
import "./SettingsButton.css";

const SettingsButton = () => {
  const navigate = useNavigate();

  return (
    <div className="settings-button" onClick={() => navigate("/Settings")}>
      <div className="icon-placeholder"></div>
    </div>
  );
};

export default SettingsButton;
