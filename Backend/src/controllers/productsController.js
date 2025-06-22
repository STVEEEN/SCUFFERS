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

// Crear nuevo producto (una imagen, un color)
productsController.createProduct = async (req, res) => {
  try {
    const { categoryId, name, price, stock, discount, color, description, line } = req.body;
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

    const newProduct = new ProductModel({
      categoryId,
      name,
      price,
      stock,
      discount,
      color,
      image: imageUrl,
      description,
      line,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: "Error al crear producto", error });
  }
};

// Actualizar producto
productsController.updateProduct = async (req, res) => {
  try {
    const { categoryId, name, price, stock, discount, color, description, line } = req.body;
    let imageUrl = "";

    // Si hay nueva imagen, sube a Cloudinary y borra la vieja
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

    const updateData = {
      categoryId, name, price, stock, discount, color, description, line
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
    res.status(400).json({ message: "Error al actualizar producto", error });
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