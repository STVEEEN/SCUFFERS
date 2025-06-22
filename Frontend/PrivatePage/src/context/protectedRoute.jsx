import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return null; // Or show a loader

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}