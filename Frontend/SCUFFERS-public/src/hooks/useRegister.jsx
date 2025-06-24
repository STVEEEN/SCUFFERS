import { useState } from "react";

export default function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const register = async (registerData, age) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:4000/api/registerUser/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: registerData.name,
          Email: registerData.email,
          Password: registerData.password,
          Age: age,
          Gender: registerData.gender,
          PhoneNumber: registerData.phoneNumber,
          Role: "Customer",
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Error al registrar");
        return false;
      }
      return true;
    } catch (err) {
      setError("Error de red");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, register };
}