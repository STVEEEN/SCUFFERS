const productsController = {};
import ProductModel from "../models/products.js";

productsController.getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find().populate("categoryId");
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

productsController.postProducts = async (req, res) => {
    try {
        const { categoryId, name, price, stock, discount } = req.body;

        const newProduct = new ProductModel({
            categoryId,
            name,
            price,
            stock,
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
            return res.status(404).json({ message: "Product not found" });
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
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export default productsController;
