import jwt from "jsonwebtoken";

// Este middleware verifica que el usuario sea admin.
// Espera un header: Authorization: Bearer <token>
export function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Token requerido" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    // Decodifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verifica el rol (ajusta según el nombre en tu modelo: Role o role)
    if (decoded.role !== "Admin") {
      return res.status(403).json({ message: "Solo los administradores pueden realizar esta acción" });
    }

    req.user = decoded; // Guarda el usuario en la request para otros usos si quieres
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}