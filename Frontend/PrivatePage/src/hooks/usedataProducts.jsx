import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const PRODUCTS_API = "http://localhost:4000/api/products";
const CATEGORIES_API = "http://localhost:4000/api/categories";

export default function useDataProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Formulario
  const [id, setId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [discount, setDiscount] = useState(0);
  const [color, setColor] = useState("#000000");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [line, setLine] = useState("");
  const [editProduct, setEditProduct] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(PRODUCTS_API);
      if (!res.ok) throw new Error("Error al obtener productos");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      toast.error("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories (para el combobox)
  const fetchCategories = async () => {
    try {
      const res = await fetch(CATEGORIES_API);
      if (!res.ok) throw new Error("Error al obtener categorías");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      toast.error("Error al cargar categorías");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Crear producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("categoryId", categoryId);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("discount", discount);
    formData.append("color", color);
    if (image) formData.append("image", image);
    formData.append("description", description);
    formData.append("line", line);

    try {
      const res = await fetch(PRODUCTS_API, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Error al crear producto");
      toast.success("Producto creado");
      resetForm();
      fetchProducts();
    } catch (error) {
      toast.error("Error al crear producto");
    } finally {
      setLoading(false);
    }
  };

  // Actualizar producto
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("categoryId", categoryId);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("discount", discount);
    formData.append("color", color);
    if (image) formData.append("image", image);
    formData.append("description", description);
    formData.append("line", line);

    try {
      const res = await fetch(`${PRODUCTS_API}/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) throw new Error("Error al actualizar producto");
      toast.success("Producto actualizado");
      resetForm();
      fetchProducts();
    } catch (error) {
      toast.error("Error al actualizar producto");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar producto
  const deleteProduct = async (productId) => {
    setLoading(true);
    try {
      const res = await fetch(`${PRODUCTS_API}/${productId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar producto");
      toast.success("Producto eliminado");
      fetchProducts();
    } catch (error) {
      toast.error("Error al eliminar producto");
    } finally {
      setLoading(false);
    }
  };

  // Iniciar edición
  const startEdit = (prod) => {
    setId(prod._id);
    setCategoryId(prod.categoryId?._id || prod.categoryId);
    setName(prod.name);
    setPrice(prod.price);
    setStock(prod.stock);
    setDiscount(prod.discount || 0);
    setColor(prod.color || "#000000");
    setImage(""); // Limpiar imagen (debe seleccionar nueva si quiere reemplazar)
    setDescription(prod.description || "");
    setLine(prod.line || "");
    setEditProduct(prod);
  };

  // Reset
  const resetForm = () => {
    setId("");
    setCategoryId("");
    setName("");
    setPrice("");
    setStock("");
    setDiscount(0);
    setColor("#000000");
    setImage("");
    setDescription("");
    setLine("");
    setEditProduct(null);
  };

  return {
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
  };
}