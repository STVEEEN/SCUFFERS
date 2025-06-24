import { Router } from "express";
import loginUserController from "../controllers/loginUserController.js";
import resendVerificationController from "../controllers/resendVerificationController.js";
import verifyEmailController from "../controllers/verifyEmailController.js";

const router = Router();

router.post("/login", loginUserController.login);
router.post("/resend-verification", resendVerificationController.resend);
router.get("/verify-email", verifyEmailController.verify);

export default router;