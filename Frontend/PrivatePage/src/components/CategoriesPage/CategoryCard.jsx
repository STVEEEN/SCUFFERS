import React, { useState } from "react";
import "./Styles.css"; // Importa tu archivo CSS si es necesario

const CategoryCard = ({ category, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!category?._id) return;
    try {
      setIsDeleting(true);
      await onDelete(category._id);
    } catch (error) {
      console.error("Error at delete the category:", error);
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
      <h4 style={{ margin: "12px 0 6px 0", color: "#00000" }}>{category.name}</h4>
      <p style={{ fontSize: "0.875rem", color: "#00000" }}>
        ID: {category._id}
      </p>
      <div>
        <button
          className="btn btn-sm btn-warning"
          style={{ backgroundColor: "#000000", color: "#ffffff", marginRight: 6, borderRadius: "0.75rem" }}
          onClick={() => onEdit(category)}
        >
          Edit
        </button>
        <button
          className="btn btn-sm btn-danger"
          style={{ backgroundColor: "#000000", color: "#ffffff", borderRadius: "0.75rem", marginLeft: 6 }}
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;