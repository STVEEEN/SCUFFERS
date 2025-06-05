import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

// Crear el contexto fuera del componente para mantener referencia estable
const AuthContext = createContext(null);

// Hook personalizado con validación
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

// Componente proveedor con useMemo para estabilidad
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error ${response.status}`);
      }

      const data = await response.json();
      
      if (!data?.message) {
        throw new Error("Respuesta inválida del servidor");
      }

      const userData = { 
        email, 
        role: data.role,
        id: data.id || null
      };

      if (data.token) {
        localStorage.setItem("authToken", data.token);
        setAuthToken(data.token);
      }

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      return { 
        success: true, 
        ...userData,
        message: data.message
      };
    } catch (error) {
      console.error("Login error:", error);
      return { 
        success: false, 
        message: error.message 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setAuthToken(null);
    
    // Opcional: llamada al backend para logout
    fetch("http://localhost:4000/api/logout", {
      method: "POST",
      credentials: "include"
    }).catch(console.error);
  };

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem("authToken");
      const savedUser = localStorage.getItem("user");
      
      if (token && savedUser) {
        try {
          setAuthToken(token);
          setUser(JSON.parse(savedUser));
        } catch (e) {
          console.error("Error parsing user data:", e);
          logout();
        }
      }
      setIsLoading(false);
    };

    verifyAuth();
  }, []);

  // Memoizar el valor del contexto para estabilidad
  const contextValue = useMemo(() => ({
    user,
    login,
    logout,
    authToken,
    isLoading
  }), [user, authToken, isLoading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Exportaciones nombradas consistentes
export { AuthProvider, useAuth };