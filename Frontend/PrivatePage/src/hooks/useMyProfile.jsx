import { useState, useEffect } from "react";

/**
 * Hook para obtener y actualizar el perfil del usuario autenticado.
 * Usa cookies httpOnly (credentials: "include") para autenticación.
 */
export default function useMyProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Obtener perfil del usuario autenticado
  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:4000/api/employees", {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("No se pudo cargar el perfil");
      }
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      setError(err.message || "Error al cargar el perfil");
    } finally {
      setLoading(false);
    }
  };

  // Actualizar perfil del usuario autenticado
  const updateProfile = async (updates) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:4000/api/employees", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updates),
      });
      if (!res.ok) {
        throw new Error("No se pudo actualizar el perfil");
      }
      const data = await res.json();
      setProfile(data);
      return { success: true, data };
    } catch (err) {
      setError(err.message || "Error al actualizar el perfil");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
  };
}