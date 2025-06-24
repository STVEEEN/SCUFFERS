import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

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
  const [discount, setDiscount] = useState(0);
  const [color, setColor] = useState("#000000");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [line, setLine] = useState("");
  const [editProduct, setEditProduct] = useState(null);

  // Variantes [{ size, stock }]
  const [variants, setVariants] = useState([{ size: "", stock: "" }]);

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

  // Fetch categories
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

    // Validación de variantes
    if (!variants.length || variants.some(v => !v.size || v.stock === "" || isNaN(Number(v.stock)))) {
      setLoading(false);
      await Swal.fire({
        icon: "warning",
        title: "¡Revisa las tallas!",
        text: "Debes agregar al menos una variante válida (talla y stock numérico).",
        confirmButtonColor: "#3085d6"
      });
      return;
    }

    const formData = new FormData();
    formData.append("categoryId", categoryId);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("color", color);
    if (image) formData.append("image", image);
    formData.append("description", description);
    formData.append("line", line);
    formData.append("variants", JSON.stringify(
      variants
        .filter(v => v.size && v.stock !== "" && !isNaN(Number(v.stock)))
        .map(v => ({ size: v.size.trim(), stock: Number(v.stock) }))
    ));

    // Debug: imprime el formdata antes de enviar
    // for (let pair of formData.entries()) { console.log(pair[0], pair[1]); }

    try {
      const res = await fetch(PRODUCTS_API, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al crear producto");
      toast.success("Producto creado");
      resetForm();
      fetchProducts();
    } catch (error) {
      toast.error(error.message || "Error al crear producto");
    } finally {
      setLoading(false);
    }
  };

  // Actualizar producto
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!variants.length || variants.some(v => !v.size || v.stock === "" || isNaN(Number(v.stock)))) {
      setLoading(false);
      await Swal.fire({
        icon: "warning",
        title: "¡Revisa las tallas!",
        text: "Debes agregar al menos una variante válida (talla y stock numérico).",
        confirmButtonColor: "#3085d6"
      });
      return;
    }

    const formData = new FormData();
    formData.append("categoryId", categoryId);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("color", color);
    if (image) formData.append("image", image);
    formData.append("description", description);
    formData.append("line", line);
    formData.append("variants", JSON.stringify(
      variants
        .filter(v => v.size && v.stock !== "" && !isNaN(Number(v.stock)))
        .map(v => ({ size: v.size.trim(), stock: Number(v.stock) }))
    ));

    try {
      const res = await fetch(`${PRODUCTS_API}/${id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al actualizar producto");
      toast.success("Producto actualizado");
      resetForm();
      fetchProducts();
    } catch (error) {
      toast.error(error.message || "Error al actualizar producto");
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
    setDiscount(prod.discount || 0);
    setColor(prod.color || "#000000");
    setImage(""); // Limpiar imagen (debe seleccionar nueva si quiere reemplazar)
    setDescription(prod.description || "");
    setLine(prod.line || "");
    setEditProduct(prod);
    setVariants(prod.variants && Array.isArray(prod.variants) && prod.variants.length
      ? prod.variants.map(v => ({
          size: v.size || "",
          stock: v.stock !== undefined ? String(v.stock) : ""
        }))
      : [{ size: "", stock: "" }]
    );
  };

  // Reset
  const resetForm = () => {
    setId("");
    setCategoryId("");
    setName("");
    setPrice("");
    setDiscount(0);
    setColor("#000000");
    setImage("");
    setDescription("");
    setLine("");
    setEditProduct(null);
    setVariants([{ size: "", stock: "" }]);
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
    variants,
    setVariants,
  };
}