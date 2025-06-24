import { useState } from "react";

export default function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const register = async (registerData, age) => {
    setLoading(true);
    setError("");
    setSuccess(false);
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
          PhoneNumber: registerData.phoneNumber || "0000-0000", // ajuste si tienes este campo
          Role: "Customer"
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, register };
}