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

      // Cleanup para prevenir fugas de memoria
      return () => URL.revokeObjectURL(objectUrl);
    }
    setPreview(null);
  }, [image]);

  return (
    <form
      onSubmit={editCategory ? handleUpdate : handleSubmit}
      className="category-form"
      style={{
        background: "#fff",
        color: "#333",
        borderRadius: "1rem",
        boxShadow: "0 4px 16px #0001",
        padding: 32,
        marginBottom: 32,
        maxWidth: 400,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      encType="multipart/form-data"
    >
      <h3 style={{ color: "#6a1b9a", marginBottom: 18 }}>
        {editCategory ? "Editar Categoría" : "Nueva Categoría"}
      </h3>
      <div className="mb-3 w-100">
        <label>Nombre</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3 w-100">
        <label>
          Imagen {editCategory ? "(elige una nueva para reemplazar)" : ""}
        </label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required={!editCategory}
        />
      </div>
      {preview && (
        <div className="text-center mb-3">
          <img
            src={preview}
            alt="Vista previa"
            style={{
              maxWidth: "100%",
              maxHeight: "200px",
              borderRadius: "1rem",
              boxShadow: "0 2px 8px rgba(156, 39, 176, 0.15)",
              objectFit: "cover",
            }}
          />
        </div>
      )}
      <div className="d-flex gap-3 mt-4">
        <button type="submit" className="btn btn-success" disabled={loading}>
          {editCategory ? "Actualizar" : "Crear"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={resetForm} // Llama a la función de cancelar
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}