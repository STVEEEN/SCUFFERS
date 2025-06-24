import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import "../../pages/addProductsPage/addProducts.css";

export default function ProductForm({
  categories,
  categoryId,
  setCategoryId,
  name,
  setName,
  price,
  setPrice,
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
  variants,
  setVariants,
}) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (editProduct) setPreview(editProduct.image);
    else setPreview(null);
  }, [editProduct]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
    else setPreview(editProduct?.image || null);
  };

  // --- VARIANTES ---
  const handleVariantChange = (idx, field, value) => {
    const newVariants = [...variants];
    newVariants[idx][field] = value;
    setVariants(newVariants);
  };

  const handleAddVariant = () => {
    setVariants([...variants, { size: "", stock: "" }]);
  };

  const handleRemoveVariant = (idx) => {
    if (variants.length === 1) return;
    setVariants(variants.filter((_, i) => i !== idx));
  };

  return (
    <div className="ProductForm-outer">
      <div className="ProductForm-wrapper">
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
          {/* Precio y Descuento */}
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
              <label>Descuento (%)</label>
              <input
                type="number"
                value={discount}
                onChange={e => setDiscount(e.target.value)}
                min={0}
                max={100}
              />
            </div>
          </div>
          {/* Color */}
          <div className="ProductForm-group ProductForm-color">
            <label>Color</label>
            <input
              type="color"
              value={color}
              onChange={e => setColor(e.target.value)}
            />
            <span className="ProductForm-colorText">{color}</span>
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
              className="ProductForm-file"
            />
            {preview && (
              <div className="ProductForm-preview">
                <img
                  src={preview}
                  alt="preview"
                  className="ProductForm-preview-img"
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
              rows={3}
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
          {/* --- VARIANTES (Tallas y Stock) --- */}
          <div className="ProductForm-group">
            <label>Variantes (Talla y Stock)</label>
            <div className="VariantList">
              {variants.map((v, idx) => (
                <div className="VariantRow" key={idx}>
                  <input
                    type="text"
                    placeholder="Talla (ej: S, M, L, 40, única)"
                    value={v.size}
                    onChange={e => handleVariantChange(idx, "size", e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={v.stock}
                    min={0}
                    onChange={e => handleVariantChange(idx, "stock", e.target.value)}
                    required
                  />
                  {variants.length > 1 && (
                    <Button
                      type="button"
                      label="X"
                      colorClass="danger"
                      style={{ padding: "0 8px", minWidth: 28, fontWeight: "bold", borderRadius: "50%" }}
                      actionButton={() => handleRemoveVariant(idx)}
                      title="Eliminar variante"
                    />
                  )}
                </div>
              ))}
            </div>
            <Button
              type="button"
              label="+ Agregar variante"
              colorClass="secondary"
              style={{ marginTop: 6, fontSize: "0.93rem" }}
              actionButton={handleAddVariant}
            />
            <small className="ProductForm-helper">
              Define las tallas disponibles (o "única" para accesorios), y el stock para cada una.
            </small>
          </div>
          <div className="ProductForm-buttons">
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
      </div>
    </div>
  );
}