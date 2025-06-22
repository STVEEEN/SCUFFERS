import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import "../../pages/addProductsPage/addProducts.css";

const initialForm = {
  categoryId: "",
  name: "",
  price: "",
  stock: "",
  discount: 0,
  color: "#000000",
  image: null,
  description: "",
  line: "",
};

export default function ProductForm({
  categories,
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
  editProduct,
  resetForm,
  loading,
}) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (editProduct) {
      setPreview(editProduct.image);
    } else {
      setPreview(null);
    }
  }, [editProduct]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
    else setPreview(editProduct?.image || null);
  };

  return (
    <form
      className="ProductForm"
      onSubmit={editProduct ? handleUpdate : handleSubmit}
      encType="multipart/form-data"
    >
      <h2 className="ProductForm-title">
        {editProduct ? "Editar Producto" : "Nuevo Producto"}
      </h2>
      {/* Categoría */}
      <div className="ProductForm-group">
        <label>Categoría</label>
        <select
          value={categoryId}
          onChange={e => setCategoryId(e.target.value)}
          required
        >
          <option value="">Selecciona una categoría</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>
      {/* Nombre */}
      <div className="ProductForm-group">
        <label>Nombre</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          placeholder="Nombre del producto"
        />
      </div>
      {/* Precio y Stock */}
      <div className="ProductForm-row">
        <div className="ProductForm-group">
          <label>Precio</label>
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            min={0}
            required
          />
        </div>
        <div className="ProductForm-group">
          <label>Stock</label>
          <input
            type="number"
            value={stock}
            onChange={e => setStock(e.target.value)}
            min={0}
            required
          />
        </div>
      </div>
      {/* Descuento */}
      <div className="ProductForm-group">
        <label>Descuento (%)</label>
        <input
          type="number"
          value={discount}
          onChange={e => setDiscount(e.target.value)}
          min={0}
          max={100}
        />
      </div>
      {/* Color */}
      <div className="ProductForm-group">
        <label>Color</label>
        <input
          type="color"
          value={color}
          onChange={e => setColor(e.target.value)}
        />
        <span style={{ marginLeft: 8 }}>{color}</span>
      </div>
      {/* Imagen */}
      <div className="ProductForm-group">
        <label>
          Imagen {editProduct ? "(elige una nueva si deseas reemplazar)" : ""}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required={!editProduct}
        />
        {preview && (
          <div className="ProductForm-preview" style={{
            marginTop: 12,
            width: 260,
            height: 260,
            border: "1px solid #ddd",
            borderRadius: "1.2rem",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#fafafa"
          }}>
            <img
              src={preview}
              alt="preview"
              style={{
                width: "95%",
                height: "95%",
                objectFit: "contain",
                cursor: "crosshair"
              }}
              title="Selecciona el color con el gotero aquí"
            />
          </div>
        )}
      </div>
      {/* Descripción */}
      <div className="ProductForm-group">
        <label>Descripción</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Describe el producto"
        />
      </div>
      {/* Línea */}
      <div className="ProductForm-group">
        <label>Línea</label>
        <input
          type="text"
          value={line}
          onChange={e => setLine(e.target.value)}
          placeholder="Línea (opcional)"
        />
      </div>
      <div className="ProductForm-buttons" style={{ display: "flex", gap: "1rem", marginTop: 28 }}>
        <Button
          type="submit"
          colorClass="normal"
          label={loading ? "Guardando..." : editProduct ? "Actualizar" : "Crear"}
          disabled={loading}
        />
        <Button
          type="button"
          colorClass="normal"
          label="Cancelar"
          actionButton={resetForm}
        />
      </div>
    </form>
  );
}