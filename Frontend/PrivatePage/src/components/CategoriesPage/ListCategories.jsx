import React from "react";
import CategoryCard from "./CategoryCard";

const ListCategories = ({ deleteCategory, updateCategory, loading, categories }) => {
  return (
    <>
      <h1 className="text-2xl font-bold underline text-center">
        Listado de categorías
      </h1>
      <div className="flex flex-wrap gap-4 justify-center mt-5">
        {loading && <div className="text-center text-gray-500">Loading...</div>}
        {categories?.map((cat) => (
          <CategoryCard
            key={cat._id}
            category={cat}
            deleteCategory={deleteCategory}
            updateCategory={updateCategory}
          />
        ))}
      </div>
    </>
  );
};

export default ListCategories;