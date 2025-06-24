import React, { useState } from "react";
import Sidebar from "../../components/UI/Sidebar/Sidebar";
import SettingsButton from "../../components/UI/SettingsButton/SettingsButton";
import useDataCategories from "../../components/CategoriesPage/hooks/useDataCategories";
import CategoryCard from "../../components/CategoriesPage/CategoryCard";
import CategoryForm from "../../components/CategoriesPage/CategoryForm";
import { Toaster } from "react-hot-toast";
import Button from "../../components/UI/Button";
import SectionTitle from "../../components/UI/sectionTitle/sectionTitle";
import Swal from "sweetalert2";

import "./categoriesPage.css";

const CategoriesPage = () => {
  const [activeSection, setActiveSection] = useState("list");
  const {
    id,
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
    resetForm();
    setActiveSection("list");
  };

  // confirmDelete utiliza SweetAlert2 para mostrar una ventana emergente de confirmación
  // antes de eliminar una categoría del sistema.
  const confirmDelete = (categoryId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la categoría permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(categoryId);
        Swal.fire("Eliminado", "La categoría ha sido eliminada.", "success");
      }
    });
  };

  return (
    <div className="Categories-container">
      <Sidebar />

      <div className="Categories-content">
        <div className="Categories-header">
          <SectionTitle className="Categories-title">CATEGORIES MANAGEMENT</SectionTitle>
          <SettingsButton />
        </div>

        <div className="d-flex justify-content-center mb-4">
          <Button
            label="See categories"
            colorClass={activeSection === "list" ? "primary" : "secondary"}
            actionButton={() => {
              setActiveSection("list");
              resetForm();
            }}
            style={{
              marginRight: "8px",
            }}
          />
          <Button
            label={id ? "Edit Category" : "Add Category"}
            colorClass={activeSection === "form" ? "primary" : "secondary"}
            actionButton={() => setActiveSection("form")}
          />
        </div>

        {activeSection === "form" && (
          <CategoryForm
            name={name}
            setName={setName}
            setImage={setImage}
            handleSubmit={handleSubmit}
            handleUpdate={handleUpdate}
            editCategory={!!id}
            resetForm={handleCancel}
            loading={loading}
            image={image}
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
                  setActiveSection("form");
                  startEdit(category);
                }}
                onDelete={() => confirmDelete(cat._id)}
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
