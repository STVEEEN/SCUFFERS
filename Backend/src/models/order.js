import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    idUser: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    idCart: {
        type: Schema.Types.ObjectId, 
        ref: "Cart", 
        required: true
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productName: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
        unitPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
      min: [0, "Total cannot be negative"],
    },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: "Payments",
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Order", orderSchema);
