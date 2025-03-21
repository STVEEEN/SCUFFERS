import { Schema, model } from "mongoose";

const userSchema = new Schema({
    Name: {
        type: String,
        required: true,
        trim: true,
        match: [
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            "Por favor, ingrese un nombre válido"
        ]
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            "Por favor, ingrese un correo electrónico válido"
        ]
    },
    Password: {
        type: String,
        required: function () {
            return this.Membership > 0; // Solo requiere contraseña si tiene membresía
        },
        minlength: [6, "La contraseña debe tener al menos 6 caracteres"]
    },
    Age: {
        type: Number,
        required: true,
        min: [1, "La edad debe ser mayor a 0"],
        max: [120, "La edad no puede ser mayor a 120"]
    },
    Gender: {
        type: String,
        required: true,
        enum: ["Men", "Women", "Other"],
        trim: true
    },
    PhoneNumber: {
        type: String,
        required: true,
        match: [
            /^[0-9]{4}-[0-9]{4}$/,
            "El teléfono debe tener el formato 2222-2222"
        ]
    },
    Role: {
        type: String,
        enum: ["Guest", "Customer"],
        default: "Guest"
    },    
    Membership: {
        type: Number,
        required: true,
        min: [1, "El nivel de membresía debe ser al menos 1"]
    }
}, {
    timestamps: true,
    strict: true
});

export default model("users", userSchema);
