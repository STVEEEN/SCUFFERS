import React from "react";
import CategoryCard from "./CategoryCard"; // Importa el componente que muestra cada categoría

// Componente que lista las categorías disponibles
const ListCategories = ({ deleteCategory, updateCategory, loading, categories }) => {
  return (
    <>
      {/* Título de la sección */}
      <h1 className="text-2xl font-bold underline text-center">
        LIST OF CATEGORIES
      </h1>

      {/* Contenedor de las tarjetas de categoría */}
      <div className="flex flex-wrap gap-4 justify-center mt-5">
        {/* Mensaje de carga si está procesando datos */}
        {loading && <div className="text-center text-gray-500">Loading...</div>}

        {/* Mapea las categorías y las renderiza como tarjetas */}
        {categories?.map((cat) => (
          <CategoryCard
            key={cat._id} // Clave única para optimización de React
            category={cat} // Pasa los datos de cada categoría
            onDelete={deleteCategory} // Función para eliminar
            onEdit={updateCategory} // Función para editar
          />
        ))}
      </div>
    </>
  );
};

export default ListCategories; // Exporta el componente para ser usado en otros archivos
