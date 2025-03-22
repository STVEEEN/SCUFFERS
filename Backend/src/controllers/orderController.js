const orderController = {};
import OrderModel from "../models/order.js";
import CartModel from "../models/cart.js";

// Obtener todas las órdenes
orderController.getOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find()
            .populate("idUser")
            .populate("items.idProduct")
            .populate("idPayment");

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// Crear una nueva orden a partir del carrito
orderController.postOrderFromCart = async (req, res) => {
    try {
        const { idCart, idPayment } = req.body;

        // Buscar el carrito
        const cart = await CartModel.findById(idCart).populate("Product.idProduct");

        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        // Transformar el carrito en una orden
        const newOrder = new OrderModel({
            idUser: cart.idCustomer,
            items: cart.products.map(item => ({
                idProducts: item.idProduct._id,
                quantity: item.quantity,
                unitPrice: item.price
            })),
            total: cart.totalAmount,
            estado: "Pendiente",
            idPayment
        });

        await newOrder.save();

        // Eliminar el carrito después de crear la orden
        await CartModel.findByIdAndDelete(idCart);

        res.status(201).json({ message: "Orden creada exitosamente", newOrder });
    } catch (error) {
        res.status(400).json({ message: "Bad Request", error });
    }
};

// Actualizar una orden
orderController.putOrder = async (req, res) => {
    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        res.json({ message: "Orden actualizada", updatedOrder });
    } catch (error) {
        res.status(400).json({ message: "Bad Request", error });
    }
};

// Eliminar una orden
orderController.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await OrderModel.findByIdAndDelete(req.params.id);

        if (!deletedOrder) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        res.json({ message: "Orden eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export default orderController;
