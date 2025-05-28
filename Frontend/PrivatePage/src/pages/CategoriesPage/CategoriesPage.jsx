import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import SettingsButton from "../../components/SettingsButton/SettingsButton";
import useDataCategories from "../../components/CategoriesPage/hooks/useDataCategories";
import CategoryCard from "../../components/CategoriesPage/CategoryCard";
import CategoryForm from "../../components/CategoriesPage/CategoryForm";
import { Toaster } from "react-hot-toast";

import "./categoriesPage.css";

const CategoriesPage = () => {
  const [activeSection, setActiveSection] = useState("list"); // Controla la sección activa
  const {
    id, // Usamos `id` para determinar si es edición o creación
    categories,
    loading,
    name,
    setName,
    setImage,
    startEdit,
    handleSubmit,
    handleUpdate,
    deleteCategory,
    resetForm,
    image,
  } = useDataCategories();

  const handleCancel = () => {
    resetForm(); // Limpia el formulario
    setActiveSection("list"); // Vuelve a la vista de categorías
  };

  return (
    <div className="Categories-container">
      <Sidebar />

      <div className="Categories-content">
        <div className="Categories-header">
          <h1 className="Categories-title">CATEGORIES MANAGEMENT</h1>
          <SettingsButton />
        </div>

        {/* Botones para alternar entre secciones */}
        <div className="d-flex justify-content-center mb-4">
          <button
            className={`btn ${activeSection === "list" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => {
              setActiveSection("list");
              resetForm(); // Limpia los datos del formulario al cambiar a "Ver Categorías"
            }}
            style={{
              marginRight: "8px",
              borderRadius: "12px",
              padding: "8px 16px",
              backgroundColor: activeSection === "list" ? "#6b21a8" : "#e0e0e0",
              color: activeSection === "list" ? "#ffffff" : "#000000",
              border: "none",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            See categories
          </button>
          <button
            className={`btn ${activeSection === "form" ? "btn-primary" : "btn-secondary"}`}
            onClick={() => setActiveSection("form")}
            style={{
              borderRadius: "12px",
              padding: "8px 16px",
              backgroundColor: activeSection === "form" ? "#6b21a8" : "#e0e0e0",
              color: activeSection === "form" ? "#ffffff" : "#000000",
              border: "none",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s, color 0.3s",
            }}
          >
            {id ? "Edit Category" : "Add Category"} {/* Revisamos `id` en lugar de `name` */}
          </button>
        </div>

        {activeSection === "form" && (
          <CategoryForm
            name={name}
            setName={setName}
            setImage={setImage}
            handleSubmit={handleSubmit}
            handleUpdate={handleUpdate}
            editCategory={!!id} // Usamos `id` para determinar si es edición
            resetForm={handleCancel} // Usa la función de cancelar para manejar el botón
            loading={loading}
            image={image} // Pasa la imagen para vista previa
          />
        )}

        {activeSection === "list" && (
          <div className="Categories-cards-list" style={{ marginTop: "3rem" }}>
            {categories.length === 0 && !loading && <p>No hay categorías.</p>}
            {categories.map((cat) => (
              <CategoryCard
                key={cat._id}
                category={cat}
                onEdit={(category) => {
                  setActiveSection("form"); // Cambia a la sección de formulario
                  startEdit(category); // Llena el formulario con los datos de la categoría
                }}
                onDelete={deleteCategory}
              />
            ))}
          </div>
        )}
        <Toaster toastOptions={{ duration: 1200 }} />
      </div>
    </div>
  );
};

export default CategoriesPage;