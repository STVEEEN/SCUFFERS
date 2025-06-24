import ProductModel from "../models/products.js";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config.js";
import fs from "fs/promises";

// Configura Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret,
});

const productsController = {};

// Obtener todos los productos
productsController.getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find().populate("categoryId");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

// Crear nuevo producto (con variantes de tallas y stock)
productsController.createProduct = async (req, res) => {
  try {
    const { categoryId, name, price, discount, color, description, line, variants } = req.body;

    // Debug: Log lo que llega
    console.log('CREATE req.body:', req.body);

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
      });
      imageUrl = result.secure_url;
      await fs.unlink(req.file.path);
    } else {
      return res.status(400).json({ message: "La imagen es obligatoria" });
    }

    let parsedVariants = variants;
    if (typeof variants === "string") {
      parsedVariants = JSON.parse(variants);
    }
    // Debug: log variantes parseadas
    console.log('PARSED VARIANTS:', parsedVariants);

    // Validación manual para ayudar al debug
    if (!Array.isArray(parsedVariants) || parsedVariants.length === 0) {
      return res.status(400).json({ message: "Debes agregar al menos una variante válida." });
    }
    if (parsedVariants.some(v => !v.size || v.stock === undefined || v.stock === "" || isNaN(Number(v.stock)))) {
      return res.status(400).json({ message: "Cada variante debe tener una talla (size) y un stock numérico." });
    }

    const newProduct = new ProductModel({
      categoryId,
      name,
      price,
      discount,
      color,
      image: imageUrl,
      description,
      line,
      variants: parsedVariants
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    // Mejor manejo de errores de Mongoose
    if (error.errors) {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ message: "Error al crear producto", errors: messages });
    }
    return res.status(400).json({ message: "Error al crear producto", error: error.message || error });
  }
};

// Actualizar producto (incluye variantes)
productsController.updateProduct = async (req, res) => {
  try {
    const { categoryId, name, price, discount, color, description, line, variants } = req.body;

    // Debug: Log lo que llega
    console.log('UPDATE req.body:', req.body);

    let imageUrl = "";

    if (req.file) {
      const product = await ProductModel.findById(req.params.id);
      if (product && product.image) {
        const publicId = product.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`products/${publicId}`);
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
      });
      imageUrl = result.secure_url;
      await fs.unlink(req.file.path);
    }

    let parsedVariants = variants;
    if (typeof variants === "string") {
      parsedVariants = JSON.parse(variants);
    }
    console.log('PARSED VARIANTS:', parsedVariants);

    if (!Array.isArray(parsedVariants) || parsedVariants.length === 0) {
      return res.status(400).json({ message: "Debes agregar al menos una variante válida." });
    }
    if (parsedVariants.some(v => !v.size || v.stock === undefined || v.stock === "" || isNaN(Number(v.stock)))) {
      return res.status(400).json({ message: "Cada variante debe tener una talla (size) y un stock numérico." });
    }

    const updateData = {
      categoryId, name, price, discount, color, description, line, variants: parsedVariants
    };
    if (imageUrl) updateData.image = imageUrl;

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(updatedProduct);
  } catch (error) {
    if (error.errors) {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ message: "Error al actualizar producto", errors: messages });
    }
    return res.status(400).json({ message: "Error al actualizar producto", error: error.message || error });
  }
};

// Eliminar producto
productsController.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Elimina imagen de Cloudinary
    if (deletedProduct.image) {
      const publicId = deletedProduct.image.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`products/${publicId}`);
    }

    res.json({ message: "Producto eliminado", data: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error });
  }
};

export default productsController;