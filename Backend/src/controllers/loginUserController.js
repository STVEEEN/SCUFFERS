import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const loginUserController = {};

loginUserController.login = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const user = await User.findOne({ Email });
    if (!user) {
      return res.status(400).json({ message: "Correo o contraseña incorrectos." });
    }

    const validPassword = await bcryptjs.compare(Password, user.Password);
    if (!validPassword) {
      return res.status(400).json({ message: "Correo o contraseña incorrectos." });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "Debes verificar tu correo para iniciar sesión." });
    }

    const token = jsonwebtoken.sign(
      { id: user._id, Email: user.Email },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn }
    );

    res.cookie("authToken", token, { httpOnly: true, secure: true, sameSite: "strict" });
    res.json({
      message: "Login exitoso",
      token,
      user: {
        Name: user.Name,
        Email: user.Email,
        Role: user.Role,
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export default loginUserController;