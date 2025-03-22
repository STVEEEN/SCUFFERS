import { Schema, model } from "mongoose";

const productSchema = new Schema({
    idCategory: {
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
    }
}, {
    timestamps: true,
    strict: true
});

export default model("Product", productSchema);
