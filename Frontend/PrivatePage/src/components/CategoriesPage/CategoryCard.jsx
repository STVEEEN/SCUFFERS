import React, { useState } from "react";
import "./Styles.css"; // Importa el archivo CSS para los estilos personalizados

const CategoryCard = ({ category, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false); // Estado para manejar el proceso de eliminación

  // Función para eliminar una categoría
  const handleDelete = async () => {
    if (!category?._id) return; // Verifica que la categoría tenga un ID válido
    try {
      setIsDeleting(true); // Activa estado de "eliminando"
      await onDelete(category._id); // Llama a la función de eliminación pasada como prop
    } catch (error) {
      console.error("Error al eliminar la categoría:", error); // Captura y muestra cualquier error
    } finally {
      setIsDeleting(false); // Restaura el estado tras finalizar la operación
    }
  };

  return (
    // Contenedor principal de la tarjeta
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
        style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: "0.75rem" }}
      />

      {/* Nombre de la categoría */}
      <h4 style={{ margin: "12px 0 6px 0", color: "#000000" }}>{category.name}</h4>

      {/* ID de la categoría */}
      <p style={{ fontSize: "0.875rem", color: "#000000" }}>
        ID: {category._id}
      </p>

      {/* Botones de edición y eliminación */}
      <div>
        <button
          className="btn btn-sm btn-warning"
          style={{ backgroundColor: "#000000", color: "#ffffff", marginRight: 6, borderRadius: "0.75rem" }}
          onClick={() => onEdit(category)} // Llama a la función de edición
        >
          Edit
        </button>
        <button
          className="btn btn-sm btn-danger"
          style={{ backgroundColor: "#000000", color: "#ffffff", borderRadius: "0.75rem", marginLeft: 6 }}
          onClick={handleDelete} // Llama a la función de eliminación
          disabled={isDeleting} // Deshabilita el botón si la categoría está en proceso de eliminación
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default CategoryCard; // Exporta el componente para su uso en otros archivos
// Exporta el componente CategoryCard para su uso en otros archivos