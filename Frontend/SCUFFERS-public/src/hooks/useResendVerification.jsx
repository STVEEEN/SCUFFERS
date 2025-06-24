import { useState } from "react";

export default function useResendVerification() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const resend = async (email) => {
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const response = await fetch("http://localhost:4000/api/authUser/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "No se pudo reenviar el correo de verificación");
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, resend };
}