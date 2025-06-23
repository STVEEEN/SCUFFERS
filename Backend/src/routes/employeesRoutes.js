import express from "express";
import employeesController from "../controllers/employeesController.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", employeesController.getEmployees);

router.put("/:id", employeesController.putEmployees);

// Soft delete: inactivar empleado (reemplaza la ruta de delete real)
router.put("/inactivate/:id", employeesController.inactivateEmployee);

router.put("/change-password/:id", verifyAdmin, employeesController.changeEmployeePassword);

export default router;