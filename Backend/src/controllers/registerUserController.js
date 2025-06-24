import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import sendVerificationEmail from "../utils/sendVerificationEmail.js";

const registerUserController = {};

registerUserController.register = async (req, res) => {
  const { Name, Email, Age, Gender, PhoneNumber, Role, Password } = req.body;

  try {
    // Verifica si el usuario ya existe
    const existUser = await User.findOne({ Email });
    if (existUser) {
      return res.status(400).json({ message: "Usuario ya existe" });
    }

    // Encripta la contraseña
    const passwordHash = await bcryptjs.hash(Password, 10);

    // Genera token de verificación y expiración (24h)
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");
    const emailVerificationExpires = new Date(Date.now() + 1000 * 60 * 60 * 24);

    // Crea el usuario
    const newUser = new User({
      Name,
      Email,
      Age,
      Gender,
      PhoneNumber,
      Role,
      Password: passwordHash,
      isVerified: false,
      emailVerificationToken,
      emailVerificationExpires,
    });

    await newUser.save();

    // Envía el email de verificación
    await sendVerificationEmail(Email, emailVerificationToken);

    res.status(201).json({ message: "Usuario registrado, revisa tu correo para verificar tu cuenta." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export default registerUserController;