const categoriesController = {};
import CategoryModel from "../models/categories.js";

// Obtener todas las categorías
categoriesController.getCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// Crear una nueva categoría
categoriesController.postCategories = async (req, res) => {
    try {
        const { name, description } = req.body;

        const newCategory = new CategoryModel({
            name,
            description
        });

        await newCategory.save();
        res.status(201).json({ message: "Categoría creada exitosamente", newCategory });
    } catch (error) {
        res.status(400).json({ message: "Bad Request", error });
    }
};

// Actualizar una categoría por ID
categoriesController.putCategories = async (req, res) => {
    try {
        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        res.json({ message: "Categoría actualizada", updatedCategory });
    } catch (error) {
        res.status(400).json({ message: "Bad Request", error });
    }
};

// Eliminar una categoría por ID
categoriesController.deleteCategories = async (req, res) => {
    try {
        const deletedCategory = await CategoryModel.findByIdAndDelete(req.params.id);

        if (!deletedCategory) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        res.json({ message: "Categoría eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export default categoriesController;
