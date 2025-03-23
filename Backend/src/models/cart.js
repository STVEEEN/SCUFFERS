import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    idUser: {
        type: Schema.Types.ObjectId,
        ref: "users", // Referencia a la colección de clientes
        required: [, "el id del usuario es obligatorio"]
    },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product", 
                required: true
            },
            quantity: {
                type: Number,
                min: [1, "La cantidad debe ser al menos 1"],
                required: true
            },
            price: {
                type: Number,
                required: true,
                min: [0, "El precio no puede ser negativo"]
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: [0, "El total no puede ser negativo"]
    },
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending"
    }
}, {
    timestamps: true 
});

export default model("Cart", cartSchema);
