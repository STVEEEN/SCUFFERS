const productsController = {};
import ProductModel from "../models/products.js";

productsController.getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find().populate("idCategory");
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

productsController.postProducts = async (req, res) => {
    try {
        const { idCategory, name, price, discount } = req.body;

        const newProduct = new ProductModel({
            idCategory,
            name,
            price,
            discount
        });

        await newProduct.save();
        res.status(201).json({ message: "Producto creado exitosamente", newProduct });
    } catch (error) {
        res.status(400).json({ message: "Bad Request", error });
    }
};

productsController.putProducts = async (req, res) => {
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json({ message: "Producto actualizado", updatedProduct });
    } catch (error) {
        res.status(400).json({ message: "Bad Request", error });
    }
};

productsController.deleteProducts = async (req, res) => {
    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export default productsController;
