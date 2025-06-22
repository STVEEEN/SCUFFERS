import React, { useState } from "react";
import Sidebar from "../../components/UI/Sidebar/Sidebar";
import SettingsButton from "../../components/UI/SettingsButton/SettingsButton";
import useDataProducts from "../../hooks/usedataProducts";
import ProductForm from "../../components/ProductsPage/ProductsForm";
import ProductList from "../../components/ProductsPage/ProductsList";
import { Toaster } from "react-hot-toast";
import Button from "../../components/UI/Button";
import SectionTitle from "../../components/UI/sectionTitle/sectionTitle";

import "../../pages/addProductsPage/addProducts.css";

const AddProductsPage = () => {
  const [activeSection, setActiveSection] = useState("list");
  const {
    products,
    categories,
    loading,
    id,
    categoryId,
    setCategoryId,
    name,
    setName,
    price,
    setPrice,
    stock,
    setStock,
    discount,
    setDiscount,
    color,
    setColor,
    image,
    setImage,
    description,
    setDescription,
    line,
    setLine,
    handleSubmit,
    handleUpdate,
    deleteProduct,
    startEdit,
    resetForm,
    editProduct,
  } = useDataProducts();

  const handleCancel = () => {
    resetForm();
    setActiveSection("list");
  };

  return (
    <div className="Products-container">
      <Sidebar />

      <div className="Products-content">
        <div className="Products-header">
          <SectionTitle className="Products-title">PRODUCTS MANAGEMENT</SectionTitle>
          <SettingsButton />
        </div>

        <div className="d-flex justify-content-center mb-4">
          <Button
            label="See products"
            colorClass={activeSection === "list" ? "primary" : "secondary"}
            actionButton={() => {
              setActiveSection("list");
              resetForm();
            }}
            style={{
              marginRight: "8px"
            }}
          />
          <Button
            label={id ? "Edit Product" : "Add Product"}
            colorClass={activeSection === "form" ? "primary" : "secondary"}
            actionButton={() => setActiveSection("form")}
          />
        </div>

        {activeSection === "form" && (
          <ProductForm
            categories={categories}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            name={name}
            setName={setName}
            price={price}
            setPrice={setPrice}
            stock={stock}
            setStock={setStock}
            discount={discount}
            setDiscount={setDiscount}
            color={color}
            setColor={setColor}
            image={image}
            setImage={setImage}
            description={description}
            setDescription={setDescription}
            line={line}
            setLine={setLine}
            handleSubmit={handleSubmit}
            handleUpdate={handleUpdate}
            editProduct={editProduct}
            resetForm={handleCancel}
            loading={loading}
          />
        )}

        {activeSection === "list" && (
          <ProductList
            products={products}
            onEdit={(product) => {
              setActiveSection("form");
              startEdit(product);
            }}
            onDelete={deleteProduct}
            loading={loading}
          />
        )}
        <Toaster toastOptions={{ duration: 1200 }} />
      </div>
    </div>
  );
};

export default AddProductsPage;