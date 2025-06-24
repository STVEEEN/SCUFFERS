import { Router } from "express";
import registerUserController from "../controllers/registerUserController.js";

const router = Router();

router.post("/register", registerUserController.register);

export default router;