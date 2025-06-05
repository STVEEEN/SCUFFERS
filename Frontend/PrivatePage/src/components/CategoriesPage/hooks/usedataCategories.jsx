import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const API_URL = "http://localhost:4000/api/categories"; // Corrección de la URL (se eliminó el punto extra)

export default function useDataCategories() {
  const [activeTab, setActiveTab] = useState("list");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(""); // Consistencia en la inicialización
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Obtener categorías
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Error al obtener categorías");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      toast.error("Error al cargar categorías");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Crear categoría
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Error al crear categoría");
      toast.success("Categoría creada");
      resetForm();
      fetchData();
    } catch (error) {
      toast.error("Error al crear categoría");
    } finally {
      setLoading(false);
    }
  };

  // Actualizar categoría
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (!res.ok) throw new Error("Error al actualizar categoría");
      toast.success("Categoría actualizada");
      resetForm();
      fetchData();
    } catch (error) {
      toast.error("Error al actualizar categoría");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar categoría
  const deleteCategory = async (categoryId) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${categoryId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar categoría");
      toast.success("Categoría eliminada");
      fetchData();
    } catch (error) {
      toast.error("Error al eliminar categoría");
    } finally {
      setLoading(false);
    }
  };

  // Iniciar edición
  const startEdit = (cat) => {
    setId(cat._id);
    setName(cat.name);
    setImage(""); // Limpiar imagen para evitar reutilización no intencionada
    setActiveTab("form");
  };

  // Restablecer formulario
  const resetForm = () => {
    setId("");
    setName("");
    setImage("");
    setActiveTab("list");
  };

  return {
    activeTab,
    setActiveTab,
    id,
    setId,
    name,
    setName,
    image,
    setImage,
    categories,
    loading,
    handleSubmit,
    handleUpdate,
    fetchData,
    deleteCategory,
    startEdit,
    resetForm,
  };
}