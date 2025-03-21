import express from "express";
import userController from "../controllers/userController.js"

const router = express.Router();

router.route("/")
    .get(userController.postEmployees)
    .post(userController.postEmployees)
router.route("/:id")
    .put(userController.putEmployees)
    .delete(userController.deleteEmployees)

export default router;