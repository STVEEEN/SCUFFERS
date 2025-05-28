import React, { useState } from "react";

const CategoryCard = ({ category, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!category?._id) return;
    try {
      setIsDeleting(true);
      await onDelete(category._id);
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
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
      <img
        src={category.image}
        alt={category.name}
        style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: "0.75rem" }}
      />
      <h4 style={{ margin: "12px 0 6px 0", color: "#6a1b9a" }}>{category.name}</h4>
      <p style={{ fontSize: "0.875rem", color: "#9c27b0" }}>
        ID: {category._id}
      </p>
      <div>
        <button
          className="btn btn-sm btn-warning"
          style={{ marginRight: 6 }}
          onClick={() => onEdit(category)}
        >
          Editar
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={handleDelete}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;