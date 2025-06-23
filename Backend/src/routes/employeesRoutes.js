import express from "express";
import employeesController from "../controllers/employeesController.js";
import { verifyAdmin } from "../middleware/auth.js";
import { authorizeRole } from "../middleware/validateAuthToken.js";
import employeesModel from "../models/employees.js";
import bcryptjs from "bcryptjs";

const router = express.Router();

// --- RUTAS PARA PERFIL PROPIO (deben ir antes de las rutas con :id) ---

// GET: Mi perfil
router.get(
  "/me",
  authorizeRole(["Admin", "Gerente", "Employee", "Bodeguero"]),
  async (req, res) => {
    try {
      const userId = req.user.id;
      if (userId === "admin") {
        // Respuesta especial para admin absoluto
        return res.json({
          name: "Admin Absoluto",
          email: "admin@example.com",
          role: "Admin",
        });
      }
      // Obtener usuario (sin password)
      const user = await employeesModel.findById(userId).select("-password");
      if (!user) return res.status(404).json({ message: "No encontrado" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: "Error de servidor" });
    }
  }
);

// PUT: Actualizar mi perfil
router.put(
  "/me",
  authorizeRole(["Admin", "Gerente", "Employee", "Bodeguero"]),
  async (req, res) => {
    try {
      const userId = req.user.id;
      if (userId === "admin") {
        return res.status(403).json({ message: "El admin absoluto no puede ser editado desde aquí" });
      }
      req.params.id = userId;
      return employeesController.putEmployees(req, res);
    } catch (err) {
      res.status(500).json({ message: "Error de servidor" });
    }
  }
);

// PUT: Cambiar contraseña propia
router.put(
  "/me/change-password",
  authorizeRole(["Admin"]), // Solo admin puede cambiar su contraseña aquí
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { newPassword } = req.body;
      if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ message: "La contraseña debe tener al menos 6 caracteres" });
      }
      if (userId === "admin") {
        return res.status(403).json({ message: "El admin absoluto no puede cambiar la contraseña aquí" });
      }
      const hashed = await bcryptjs.hash(newPassword, 10);
      await employeesModel.findByIdAndUpdate(userId, { password: hashed });
      res.json({ message: "Contraseña cambiada correctamente" });
    } catch (err) {
      res.status(500).json({ message: "Error de servidor" });
    }
  }
);

// --- RUTAS GENERALES (deben ir después de las rutas /me) ---

router.get("/", employeesController.getEmployees);

router.put("/inactivate/:id", employeesController.inactivateEmployee);

router.put("/change-password/:id", verifyAdmin, employeesController.changeEmployeePassword);

router.put("/:id", employeesController.putEmployees);

export default router;