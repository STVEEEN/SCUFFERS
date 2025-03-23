import OrderModel from "../models/Order.js";
import CartModel from "../models/cart.js";

const orderController = {};

orderController.getOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find()
            .populate("userId") 
            .populate("items.productId") 
            .populate("paymentId"); 

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

orderController.postOrder = async (req, res) => {
    try {
        const { cartId, paymentId } = req.body;

        // Buscar el carrito
        const cart = await CartModel.findById(cartId);
        if (!cart || cart.status !== "pending") {
            return res.status(400).json({ message: "Cart not found" });
        }

        // Crear la nueva orden con los productos del carrito
        const newOrder = new OrderModel({
            userId: cart.userId,  
            cartId: cart._id,      
            items: cart.products,  
            total: cart.totalAmount, 
            status: "Processing",  
            paymentId,             
            createdAt: new Date() 
        });
        await newOrder.save();

        // Marcar el carrito como completado
        await CartModel.findByIdAndUpdate(cartId, { status: "completed" });
        res.status(201).json({ message: "Order creado", order: newOrder });
    } catch (error) {
        res.status(500).json({ message: "Error creando order", error });
    }
};

orderController.putOrder = async (req, res) => {
    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order actualizado correctamente", updatedOrder });
    } catch (error) {
        res.status(400).json({ message: "Bad Request", error });
    }
};

orderController.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await OrderModel.findByIdAndDelete(req.params.id);

        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order deleted" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export default orderController;
