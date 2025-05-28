import React from "react";

const Button = ({ label, actionButton, colorClass, type="button" }) => {
  let className = ""

  if(colorClass === "primary") {
    className = "m-1 px-4 py-2 font-semibold rounded";
  }
  else if(colorClass === "secondary") {
    className = "m-1 px-4 py-2 font-semibold rounded";
  }
  else if(colorClass === "danger") {
    className = "m-1 px-4 py-2 font-semibold rounded";
  }
  else if (colorClass === "warning") {
    className = "ml-2 mt-4 px-4 py-2 font-semibold rounded";
  }
  else {
    className = "m-1 px-4 py-2 font-semibold rounded";
  }

  return (
    <button
      type={type}
      className={className}
      style={{
        background: "linear-gradient(135deg,rgb(0, 0, 0)rgb(0, 0, 0)21a8 100%)",
        color: "#FFFFFF",
        border: "none",
        borderRadius: "1rem",
        boxShadow: "0 4px 16px 0 rgba(110, 23, 182, 0.15)",
        textShadow: "0 0 8px rgb(0, 0, 0)",
        letterSpacing: "1px",
        marginLeft: "1rem",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseOver={e => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 8px 32px 0 rgba(74, 10, 117, 0.25)";
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 16px 0 rgba(142, 25, 165, 0.15)";
      }}
      onClick={actionButton}
    >
      {label}
    </button>
  );
};
export default Button;
