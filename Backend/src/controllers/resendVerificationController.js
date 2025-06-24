import User from "../models/user.js";
import crypto from "crypto";
import sendVerificationEmail from "../utils/sendVerificationEmail.js";

const resendVerificationController = {};

resendVerificationController.resend = async (req, res) => {
  const { Email } = req.body;

  try {
    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado." });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "El correo ya está verificado." });
    }

    // Genera nuevo token y expiración (24h)
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");
    const emailVerificationExpires = new Date(Date.now() + 1000 * 60 * 60 * 24);

    user.emailVerificationToken = emailVerificationToken;
    user.emailVerificationExpires = emailVerificationExpires;
    await user.save();

    await sendVerificationEmail(user.Email, emailVerificationToken);

    res.json({ message: "Correo de verificación reenviado. Revisa tu bandeja de entrada." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor." });
  }
};

export default resendVerificationController;