const cartController = {};
import CartModel from "../models/cart.js";

cartController.getCarts = async (req, res) => {
    try {
        const carts = await CartModel.find().populate("userId").populate("products.idProduct");
        res.json(carts);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

cartController.postCart = async (req, res) => {
    try {
        const { userId, products, totalAmount, status } = req.body;

        const newCart = new CartModel({
            userId,
            products,
            totalAmount,
            status
        });

        await newCart.save();
        res.status(201).json({ message: "Carrito creado exitosamente", newCart });
    } catch (error) {
        res.status(400).json({ message: "Bad Request", error });
    }
};

cartController.putCart = async (req, res) => {
    try {
        const updatedCart = await CartModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        res.json({ message: "Carrito actualizado", updatedCart });
    } catch (error) {
        res.status(400).json({ message: "Bad Request", error });
    }
};

cartController.deleteCart = async (req, res) => {
    try {
        const deletedCart = await CartModel.findByIdAndDelete(req.params.id);

        if (!deletedCart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        res.json({ message: "Carrito eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export default cartController;
