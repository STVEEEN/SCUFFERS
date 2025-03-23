import PaymentModel from "../models/payments.js";
import OrderModel from "../models/Order.js";

const paymentController = {};

paymentController.getPayments = async (req, res) => {
    try {
        const payments = await PaymentModel.find()
            .populate("userId")  
            .populate("orderId");  

        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

paymentController.postPayments = async (req, res) => {
    try {
        const { userId, orderId, paymentMethod, amount } = req.body;

        const order = await OrderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        const newPayment = new PaymentModel({
            userId,
            orderId,
            paymentMethod,
            amount,
            paymentStatus: "Completed" 
        });

        await newPayment.save();

        await OrderModel.findByIdAndUpdate(orderId, { status: "Completed" });

        res.status(201).json({ message: "Payment processed successfully", payment: newPayment });
    } catch (error) {
        res.status(500).json({ message: "Error processing payment", error });
    }
};

paymentController.putPayments = async (req, res) => {
    try {
        const updatedPayment = await PaymentModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        res.json({ message: "Payment updated successfully", updatedPayment });
    } catch (error) {
        res.status(400).json({ message: "Bad Request", error });
    }
};

paymentController.deletePayments = async (req, res) => {
    try {
        const deletedPayment = await PaymentModel.findByIdAndDelete(req.params.id);

        if (!deletedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        res.json({ message: "Payment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export default paymentController;
