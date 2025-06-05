import loginEmployeesController from "../controllers/loginEmployeesController.js";
import express from "express";

const router = express.Router();
router.route("/").post(loginEmployeesController.login);

export default router;