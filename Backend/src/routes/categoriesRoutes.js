import { Router } from "express";
import multer from "multer";
import categoryController from "../controllers/categoriesController.js";

const router = Router();
const upload = multer({ dest: "public/" });

router
  .route("/")
  .get(categoryController.getCategories)
  .post(upload.single("image"), categoryController.createCategory);

router
  .route("/:id")
  .put(upload.single("image"), categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

export default router;