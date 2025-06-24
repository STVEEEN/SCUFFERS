import { useState } from "react";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:4000/api/authUser/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email, Password: password }),
        credentials: "include"
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");
      setUser(data.user);
      return { success: true, user: data.user, message: data.message };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, user, login };
}