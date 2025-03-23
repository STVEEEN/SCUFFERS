import express from "express";
import  paymentsController from "../controllers/paymentsController"
const router = express.Router();

router.route("/")
    .get( paymentsController.getPayments)
    .post( paymentsController.postPayments)
router.route("/:id")
    .put( paymentsController.putPayments)
    .delete( paymentsController.deletePayments)

export default router;