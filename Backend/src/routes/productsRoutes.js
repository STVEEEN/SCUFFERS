import express from "express";
import productsController from "../controllers/productsController.js"
const router = express.Router();

router.route("/")
    .get(productsController.getProducts)
    .post(productsController.postProducts)
router.route("/:id")
    .put(productsController.putProducts)
    .delete(productsController.deleteProducts)

export default router;