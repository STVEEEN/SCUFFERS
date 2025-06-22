import React, { useState } from "react";
import Button from "../UI/Button"; // Ajusta la ruta si es necesario
import "./Styles.css";

const CategoryCard = ({ category, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  // Función para eliminar una categoría
  const handleDelete = async () => {
    if (!category?._id) return;
    try {
      setIsDeleting(true);
      await onDelete(category._id);
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="category-card"
      style={{
        border: "1px solid #eee",
        borderRadius: "1rem",
        boxShadow: "0 4px 16px #0001",
        width: 220,
        margin: 12,
        padding: 16,
        background: "#ffffff",
        color: "#333333",
        textAlign: "center",
      }}
    >
      {/* Imagen de la categoría */}
      <img
        src={category.image}
        alt={category.name}
        style={{
          width: "100%",
          height: 200,
          objectFit: "cover",
          borderRadius: "0.75rem",
        }}
      />

      {/* Nombre de la categoría */}
      <h4 style={{ margin: "12px 0 6px 0", color: "#000000" }}>
        {category.name}
      </h4>

      {/* ID de la categoría */}
      <p style={{ fontSize: "0.875rem", color: "#000000" }}>
        ID: {category._id}
      </p>

      {/* Botones de edición y eliminación */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 8 }}>
        <Button
          label="Edit"
          colorClass="normal"
          actionButton={() => onEdit(category)}
          type="button"
        />
        <Button
          label={isDeleting ? "Deleting..." : "Delete"}
          colorClass="normal"
          actionButton={handleDelete}
          type="button"
          disabled={isDeleting}
        />
      </div>
    </div>
  );
};

export default CategoryCard;