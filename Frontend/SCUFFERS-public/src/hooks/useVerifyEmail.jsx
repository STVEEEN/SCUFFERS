// Ya no es necesario si toda la verificación está en VerifyEmail.jsx, pero puedes dejarlo si lo usas en otro lado.
import { useState } from "react";

export default function useVerifyEmail() {
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const verify = async (token) => {
    setLoading(true);
    setError("");
    setVerified(false);
    try {
      const response = await fetch(`http://localhost:4000/api/authUser/verify-email?token=${token}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Verification failed");
      setVerified(true);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, verified, error, verify };
}