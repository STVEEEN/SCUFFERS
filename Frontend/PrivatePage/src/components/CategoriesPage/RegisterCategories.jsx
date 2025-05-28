import React from "react";
import "./styles.css"; // Importa el archivo CSS para los estilos personalizados

// Componente para registrar o actualizar categorías
const RegisterCategories = ({
  id,
  name,
  setName,
  image,
  setImage,
  handleSubmit,
  handleUpdate,
  loading
}) => {
  return (
    // Contenedor principal que centra el formulario
    <div className="d-flex justify-content-center align-items-center" style={{ padding: "2rem" }}>
      {/* Formulario con estilos y lógica para registrar o actualizar */}
      <form
        className="mx-auto mb-5 register-categories-container"
        onSubmit={id ? handleUpdate : handleSubmit} // Si hay un ID, se actualiza, de lo contrario, se registra
        encType="multipart/form-data"
      >
        {/* Título del formulario */}
        <h1 className="fw-bold mb-4 text-center register-categories-title">
          {id ? "Update Category" : "Register Category"}
        </h1>

        {/* Campo para el nombre de la categoría */}
        <div className="row g-3">
          <div className="col-md-12">
            <label className="form-label register-categories-label" htmlFor="name">
              Name
            </label>
            <input
              className="form-control register-categories-input"
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          {/* Campo para la imagen de la categoría */}
          <div className="col-md-12">
            <label className="form-label register-categories-label" htmlFor="image">
              Image
            </label>
            <input
              className="form-control register-categories-input"
              id="image"
              type="file"
              accept="image/*"
              onChange={e => setImage(e.target.files[0])}
              required={!id}
            />
          </div>
        </div>

        {/* Botón para enviar el formulario */}
        <button
          type="submit"
          className="btn w-100 fw-bold mt-4 register-categories-submit"
          disabled={loading}
        >
          {id ? "UPDATE" : "REGISTER"}
        </button>
      </form>
    </div>
  );
};

export default RegisterCategories; // Exporta el componente para ser utilizado en otros archivos
