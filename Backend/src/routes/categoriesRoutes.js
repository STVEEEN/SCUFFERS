import express from "express";
import  categoriesController from "../controllers/categoriesController.js"

const router = express.Router();

router.route("/")
    .get( categoriesController.getCategories)
    .post( categoriesController.postCategories)
router.route("/:id")
    .put( categoriesController.putCategories)
    .delete( categoriesController.deleteCategories)

export default router;