import React from "react";

/**
 * Button component with three variants:
 * - primary: morado degradado (activo)
 * - secondary: gris lila claro (inactivo)
 * - normal: negro, redondeado, texto negro, solo shadow en hover
 *
 * Props:
 * - label: string (text in button)
 * - actionButton: function (onClick)
 * - colorClass: "primary" | "secondary" | "normal"
 * - type: "button" | "submit" | ...
 * - ...rest: any other props
 */
const Button = ({
  label,
  actionButton,
  colorClass = "normal",
  type = "button",
  ...rest
}) => {
  let bgStyle = {};
  let btnClass =
    "m-1 px-4 py-2 font-semibold rounded transition-all duration-300 focus:outline-none";

  if (colorClass === "primary") {
    // Morado degradado
    bgStyle = {
      background: "linear-gradient(135deg, #6f2da8 0%, #b113ef 100%)",
      color: "#fff",
      border: "none",
      borderRadius: "1rem",
      boxShadow: "0 4px 16px 0 rgba(110, 23, 182, 0.15)",
      textShadow: "0 0 8px rgb(0, 0, 0)",
      letterSpacing: "1px",
      marginLeft: "1rem",
      transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
      outline: "none"
    };
  } else if (colorClass === "secondary") {
    // Gris claro
    bgStyle = {
      background: "linear-gradient(135deg, #e2d6f6 0%, #d9b4fa 100%)",
      color: "#6f2da8",
      border: "none",
      borderRadius: "1rem",
      boxShadow: "0 2px 8px 0 rgba(110, 23, 182, 0.08)",
      letterSpacing: "1px",
      marginLeft: "1rem",
      transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
      outline: "none"
    };
  } else {
    // Botón normal: negro con texto negro, redondeado, solo shadow en hover
    bgStyle = {
      background: "#000",
      color: "#fff",
      border: "none",
      borderRadius: "1rem",
      boxShadow: "0 2px 8px 0 rgba(32,32,32,0.09)",
      letterSpacing: "1px",
      marginLeft: "1rem",
      transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
      outline: "none"
    };
  }

  // Hover: animar shadow y scale
  return (
    <button
      type={type}
      className={btnClass}
      style={bgStyle}
      {...rest}
      onMouseOver={e => {
        e.currentTarget.style.transform = "scale(1.05)";
        if (colorClass === "primary") {
          e.currentTarget.style.boxShadow =
            "0 8px 32px 0 rgba(74, 10, 117, 0.25)";
        } else if (colorClass === "secondary") {
          e.currentTarget.style.boxShadow =
            "0 4px 24px 0 rgba(110, 23, 182, 0.13)";
        } else {
          // Normal: shadow negro más fuerte
          e.currentTarget.style.boxShadow =
            "0 8px 24px 0 rgba(255, 255, 255, 0.3)";
        }
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = "scale(1)";
        if (colorClass === "primary") {
          e.currentTarget.style.boxShadow =
            "0 4px 16px 0 rgba(110, 23, 182, 0.15)";
        } else if (colorClass === "secondary") {
          e.currentTarget.style.boxShadow =
            "0 2px 8px 0 rgba(110, 23, 182, 0.08)";
        } else {
          e.currentTarget.style.boxShadow =
            "0 2px 8px 0 rgba(32,32,32,0.09)";
        }
      }}
      onClick={actionButton}
    >
      {label}
    </button>
  );
};

export default Button;