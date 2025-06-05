import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

// allowedRoles: array de roles permitidos, ejemplo: ["Admin", "Gerente"]
export const authorizeRole = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      // 1. Extraer el token de las cookies
      const { authToken } = req.cookies;

      // 2. Validar si existe el token
      if (!authToken) {
        return res.status(401).json({ message: "No autenticado, debes iniciar sesión" });
      }

      // 3. Extraer información del token
      const decoded = jsonwebtoken.verify(authToken, config.JWT.secret);
      req.user = decoded; // { id, role }

      // 4. Verificar si el rol está permitido
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Acceso denegado, no tienes permisos" });
      }

      // 5. Si pasa el filtro, permitir acceso
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }
  };
};

export default authorizeRole;