import express from "express";
import  cartController from "../controllers/cartController.js"

const router = express.Router();

router.route("/")
    .get( cartController.getCarts)
    .post( cartController.postCart)
router.route("/:id")
    .put( cartController.putCart)
    .delete( cartController.deleteCart)

export default router;