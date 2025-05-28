import React from "react";
import "./styles.css"; // Importa tu archivo CSS si es necesario

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
    <div className="d-flex justify-content-center align-items-center" style={{ padding: "2rem" }}>
      <form
        className="mx-auto mb-5"
        style={{
          maxWidth: "600px",
          background: "white",
          border: "none",
          borderRadius: "1.5rem",
          boxShadow: "0 8px 32px rgba(149, 117, 205, 0.3)",
          color: "#00000",
          padding: "2rem",
        }}
        onSubmit={id ? handleUpdate : handleSubmit}
        encType="multipart/form-data"
      >
        <h1 className="fw-bold mb-4 text-center" style={{ color: "#000000", letterSpacing: "2px" }}>
          {id ? "update Category" : "Register Category"}
        </h1>
        <div className="row g-3">
          <div className="col-md-12">
            <label className="form-label" htmlFor="name" style={{ color: "#000000" }}>
              Name
            </label>
            <input
              className="form-control"
              style={{
                background: "rgba(0, 0, 0, 0.9)",
                color: "#000000",
                border: "1px solidrgb(0, 0, 0)",
                borderRadius: "0.75rem",
              }}
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="col-md-12">
            <label className="form-label" htmlFor="image" style={{ color: "#000000" }}>
              Image
            </label>
            <input
              className="form-control"
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                color: "#00000",
                border: "1px solidrgb(0, 0, 0)",
                borderRadius: "0.75rem",
              }}
              id="image"
              type="file"
              accept="image/*"
              onChange={e => setImage(e.target.files[0])}
              required={!id}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn w-100 fw-bold mt-4"
          style={{
            background: "linear-gradient(135deg,rgb(0, 0, 0) 0%,rgb(0, 0, 0) 100%)",
            color: "white",
            border: "none",
            borderRadius: "1rem",
            boxShadow: "0 4px 16px rgba(156, 39, 176, 0.2)",
            letterSpacing: "1px",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          disabled={loading}
        >
          {id ? "UPDATE" : "REGISTER"}
        </button>
      </form>
    </div>
  );
};

export default RegisterCategories;