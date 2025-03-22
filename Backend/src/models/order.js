import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    idCliente: {
        type: Schema.Types.ObjectId,
        ref: "users", // Referencia a la colección de clientes
        required: true
    },
    items: [
        {
            idProducto: {
                type: Schema.Types.ObjectId,
                ref: "Product", // Referencia a la colección de productos
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, "La cantidad debe ser al menos 1"]
            },
            UnitPrice: {
                type: Number,
                required: true,
                min: [0, "El precio unitario no puede ser negativo"]
            }
        }
    ],
    total: {
        type: Number,
        required: true,
        min: [0, "El total no puede ser negativo"]
    },
    status: {
        type: String,
        enum: ["Pendiente", "En preparación", "Enviado", "Entregado", "Cancelado"],
        default: "Pendiente"
    },
    idPayment: {
        type: Schema.Types.ObjectId,
        ref: "Payments",
        required: true
    }
}, {
    timestamps: { createdAt: "fechaCreacion", updatedAt: "fechaActualizacion" } 
});

export default model("Order", orderSchema);
