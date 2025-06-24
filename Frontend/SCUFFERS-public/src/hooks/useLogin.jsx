import { useState } from "react";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:4000/api/authUser/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ Email: email, Password: password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Error al iniciar sesión");
        return { success: false, message: data.message };
      }
      return { success: true, user: data.user, token: data.token };
    } catch (err) {
      setError("Error de red");
      return { success: false, message: "Error de red" };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, login };
}