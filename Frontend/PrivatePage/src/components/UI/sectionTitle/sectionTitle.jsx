import React from "react";
import "./SectionTitle.css";

export default function SectionTitle({ children, style }) {
  return (
    <h1 className="SectionTitle" style={style}>
      {children}
    </h1>
  );
}