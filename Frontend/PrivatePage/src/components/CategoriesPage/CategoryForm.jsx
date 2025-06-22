import React, { useEffect, useState } from "react";
import Button from "../UI/Button";

// Componente principal que maneja el formulario de categorías
export default function CategoryForm({
  name,
  setName,
  setImage,
  handleSubmit,
  handleUpdate,
  editCategory,
  resetForm,
  loading,
  image,
}) {
  const [preview, setPreview] = useState(null); // Estado para la vista previa de la imagen

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image); // Genera una URL temporal para mostrar la imagen
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl); // Limpia la URL temporal para evitar fugas de memoria
    }
    setPreview(null);
  }, [image]);

  return (
    // Formulario de categorías
    <form
      onSubmit={editCategory ? handleUpdate : handleSubmit}
      className="categories-form-container"
      encType="multipart/form-data"
    >
      {/* Título del formulario */}
      <h3 className="categories-form-title">
        {editCategory ? "Edit Category" : "New Category"}
      </h3>

      {/* Input para el nombre de la categoría */}
      <div className="categories-form-group">
        <label className="categories-form-label">Name</label>
        <input
          type="text"
          className="categories-form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Input para cargar la imagen de la categoría */}
      <div className="categories-form-group">
        <label className="categories-form-label">
          Image {editCategory ? "(choose a new one to replace)" : ""}
        </label>
        <input
          type="file"
          className="categories-form-input"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required={!editCategory}
        />
      </div>

      {/* Vista previa de la imagen si existe */}
      {preview && (
        <div className="categories-form-preview-container">
          <img src={preview} alt="preview" className="categories-form-preview" />
        </div>
      )}

      {/* Botones para enviar o cancelar */}
      <div className="categories-form-buttons" style={{ display: "flex", gap: "1rem", marginTop: 20 }}>
        <Button
          type="submit"
          colorClass="normal"
          label={loading ? "Saving..." : editCategory ? "Update" : "Create"}
          disabled={loading}
        />
        <Button
          type="button"
          colorClass="normal"
          label="Cancel"
          actionButton={resetForm}
        />
      </div>
    </form>
  );
}