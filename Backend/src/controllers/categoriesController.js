import Category from "../models/categories.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";

// Configura Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

const categoryController = {};

// Obtener todas las categorías
categoryController.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener categorías", error });
  }
};

// Crear nueva categoría
categoryController.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        req.file.path, 
        {
          folder: "categories",
          allowed_formats: ["jpg", "png", "jpeg", "webp"],
        }
      );
      imageUrl = result.secure_url;
    } else {
      return res.status(400).json({ message: "La imagen es obligatoria" });
    }

    const newCategory = new Category({ name, image: imageUrl });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: "Error al crear categoría", error });
  }
};

// Actualizar categoría
categoryController.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    let imageUrl = "";

    // Si hay nueva imagen, sube a Cloudinary y borra la vieja
    if (req.file) {
      const category = await Category.findById(req.params.id);
      if (category && category.image) {
        const publicId = category.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`categories/${publicId}`);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "categories",
        allowed_formats: ["jpg", "png", "jpeg", "webp"],
      });
      imageUrl = result.secure_url;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, ...(imageUrl && { image: imageUrl }) },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar categoría", error });
  }
};

// Eliminar categoría
categoryController.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    // Elimina de Cloudinary la imagen asociada
    if (deletedCategory.image) {
      const publicId = deletedCategory.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`categories/${publicId}`);
    }

    res.json({ message: "Categoría eliminada", data: deletedCategory });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar categoría", error });
  }
};

export default categoryController;