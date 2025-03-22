import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^[a-zA-Z\s]+$/, "Por favor, ingrese un nombre válido"]
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true,
    strict: true
});

export default model("Category", categorySchema);
