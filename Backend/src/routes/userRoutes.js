import express from "express";
import userController from "../controllers/userController.js"

const router = express.Router();

router.route("/")
    .get(userController.getUsers)
    .post(userController.postUsers)
router.route("/:id")
    .put(userController.putUsers)
    .delete(userController.deleteUsers)

export default router;