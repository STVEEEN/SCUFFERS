import React, { useEffect, useState } from "react";

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
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl); // Cleanup
    }
    setPreview(null);
  }, [image]);

  return (
    <form
      onSubmit={editCategory ? handleUpdate : handleSubmit}
      className="categories-form-container"
      encType="multipart/form-data"
    >
      <h3 className="categories-form-title">
        {editCategory ? "Editar Categoría" : "Nueva Categoría"}
      </h3>

      <div className="categories-form-group">
        <label className="categories-form-label">Nombre</label>
        <input
          type="text"
          className="categories-form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="categories-form-group">
        <label className="categories-form-label">
          Imagen {editCategory ? "(elige una nueva para reemplazar)" : ""}
        </label>
        <input
          type="file"
          className="categories-form-input"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required={!editCategory}
        />
      </div>

      {preview && (
        <div className="categories-form-preview-container">
          <img src={preview} alt="Vista previa" className="categories-form-preview" />
        </div>
      )}

      <div className="categories-form-buttons">
        <button type="submit" className="categories-form-submit" disabled={loading}>
          {editCategory ? "Actualizar" : "Crear"}
        </button>
        <button type="button" className="categories-form-cancel" onClick={resetForm}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
