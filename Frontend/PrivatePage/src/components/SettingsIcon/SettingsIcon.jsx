import React from "react";
import { useNavigate } from "react-router-dom";
import "./SettingsIcon.css";

const SettingsIcon = () => {
  const navigate = useNavigate();

  return (
    <div className="settings-icon" onClick={() => navigate("/settings")}>
      <div className="icon-placeholder"></div>
    </div>
  );
};

export default SettingsIcon;
