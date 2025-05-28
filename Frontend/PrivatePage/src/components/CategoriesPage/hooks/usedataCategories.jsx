import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const API_URL = "http://localhost:4000/.api/categories";

export default function useDataCategories() {
  const [activeTab, setActiveTab] = useState("list");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setCategories(data);
    } catch {
      toast.error("Error al cargar categorías");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Create
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
      if (!res.ok) throw new Error();
      toast.success("Categoría creada");
      cleanData();
      fetchData();
      setActiveTab("list");
    } catch {
      toast.error("Error al crear categoría");
    }
    setLoading(false);
  };

  // Update
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
      if (!res.ok) throw new Error();
      toast.success("Categoría actualizada");
      cleanData();
      fetchData();
      setActiveTab("list");
    } catch {
      toast.error("Error al actualizar categoría");
    }
    setLoading(false);
  };

  // Delete
  const deleteCategory = async (categoryId) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${categoryId}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Categoría eliminada");
      fetchData();
    } catch {
      toast.error("Error al eliminar categoría");
    }
    setLoading(false);
  };

  // Edit
  const startEdit = (cat) => {
    setId(cat._id);
    setName(cat.name);
    setActiveTab("form");
  };

  // Limpia el formulario
  const resetForm = () => {
    setId("");
    setName("");
    setImage("");
    setActiveTab("list"); // Vuelve a la vista de lista
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
    resetForm, // Exporta correctamente la función
  };
}