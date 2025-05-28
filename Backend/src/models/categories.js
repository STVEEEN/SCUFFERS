import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    image: {
        type: String, // URL Cloudinary
        required: true
    }
}, {
    timestamps: true,
    strict: true
});

export default model("Category", categorySchema);