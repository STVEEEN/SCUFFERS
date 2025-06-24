import { Schema, model } from "mongoose";

const variantSchema = new Schema({
  size: {
    type: String, // "S", "M", "L", "única", "40", etc.
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: [0, "Stock no puede ser negativo"]
  }
}, { _id: false });

const productSchema = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, "El precio no puede ser negativo"]
    },
    discount: {
        type: Number,
        default: 0,
        min: [0, "El descuento no puede ser negativo"]
    },
    color: {
        type: String, // hex o nombre ("#FF0000", "red", etc)
        required: true
    },
    image: {
        type: String, // url de Cloudinary
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    line: { // <--- Usando "line" en vez de "collection"
        type: String,
        default: ""
    },
    variants: {
        type: [variantSchema],
        required: true
    }
}, {
    timestamps: true,
    strict: true
});

export default model("Product", productSchema);