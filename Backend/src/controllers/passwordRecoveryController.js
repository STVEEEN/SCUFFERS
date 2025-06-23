import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import usersModel from "../models/user.js";
import employeeModel from "../models/employees.js";

import { config } from "../config.js";
import { sendMail, HTMLRecoveryEmail } from "../utils/mailPasswordRecovey.js";

const passwordRecoveryController = {};

// Utilidad para normalizar el correo (opcional pero recomendado)
function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

passwordRecoveryController.requestCode = async (req, res) => {
  const email = normalizeEmail(req.body.email);
  console.log("[PasswordRecovery] Petición recibida para:", email);

  try {
    let userFound = null;
    let userRole = null;
    let userType = null;

    // Buscar primero en usuarios (clientes)
    userFound = await usersModel.findOne({ Email: email });
    if (userFound) {
      userRole = userFound.Role || "Customer";
      userType = "user";
      console.log("[PasswordRecovery] Usuario encontrado en 'users'. Rol:", userRole);
    } else {
      // Buscar en empleados
      userFound = await employeeModel.findOne({ email });
      if (userFound) {
        userRole = userFound.Role || "Employee";
        userType = "employee";
        console.log("[PasswordRecovery] Usuario encontrado en 'employees'. Rol:", userRole);
      }
    }

    if (!userFound) {
      console.log("[PasswordRecovery] Usuario no encontrado en ninguna colección.");
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Generar código aleatorio de 5 dígitos
    const code = Math.floor(10000 + Math.random() * 90000).toString();

    // Crear JWT con email, código, rol, usuarioTipo y flag verified
    const token = jsonwebtoken.sign(
      { email, code, userRole, userType, verified: false },
      config.JWT.secret,
      { expiresIn: "20m" }
    );

    res.cookie("tokenRecoveryCode", token, { maxAge: 20 * 60 * 1000, httpOnly: true });

    // Enviar correo con el código
    const mailResult = await sendMail(
      email,
      "Código de recuperación de contraseña",
      `Tu código de verificación es: ${code}`,
      HTMLRecoveryEmail(code)
    );

    if (!mailResult) {
      console.error("[PasswordRecovery] Error: No se pudo enviar el correo.");
      return res.status(500).json({ message: "No se pudo enviar el correo. Intenta más tarde." });
    }

    res.json({ message: "Código de verificación enviado" });
  } catch (error) {
    console.error("[PasswordRecovery] Error en requestCode:", error);
    res.status(500).json({ message: "Error enviando el código de recuperación" });
  }
};

passwordRecoveryController.verifyCode = async (req, res) => {
  const { code } = req.body;

  try {
    const token = req.cookies.tokenRecoveryCode;
    if (!token) return res.status(401).json({ message: "Token no proporcionado" });

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    if (decoded.code !== code) {
      return res.status(400).json({ message: "Código inválido" });
    }

    // Elimina exp e iat del payload antes de firmar el nuevo token
    const { exp, iat, ...payload } = decoded;

    // Nuevo token con verified: true
    const newToken = jsonwebtoken.sign(
      {
        ...payload,
        verified: true,
      },
      config.JWT.secret,
      { expiresIn: "20m" }
    );
    res.cookie("tokenRecoveryCode", newToken, { maxAge: 20 * 60 * 1000, httpOnly: true });

    res.json({ message: "Código verificado exitosamente" });
  } catch (error) {
    console.error("[PasswordRecovery] Error en verifyCode:", error);
    res.status(500).json({ message: "Error verificando el código" });
  }
};

passwordRecoveryController.newPassword = async (req, res) => {
  const { newPassword } = req.body;

  try {
    const token = req.cookies.tokenRecoveryCode;
    if (!token) return res.status(401).json({ message: "Token no proporcionado" });

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    if (!decoded.verified) {
      return res.status(401).json({ message: "Código no verificado, no se puede restablecer la contraseña" });
    }

    const { email, userType } = decoded;
    let user = null;

    // Buscar usuario según el tipo
    if (userType === "user") {
      user = await usersModel.findOne({ Email: email });
    } else if (userType === "employee") {
      user = await employeeModel.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Encriptar la nueva contraseña
    const hashPassword = await bcryptjs.hash(newPassword, 10);

    // Actualizar la contraseña en el campo correcto
    if (userType === "user") {
      await usersModel.findOneAndUpdate(
        { Email: email },
        { Password: hashPassword }
      );
    } else if (userType === "employee") {
      await employeeModel.findOneAndUpdate(
        { email },
        { password: hashPassword }
      );
    }

    res.clearCookie("tokenRecoveryCode");

    res.json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    console.error("[PasswordRecovery] Error en newPassword:", error);
    res.status(500).json({ message: "Error actualizando la contraseña" });
  }
};

export default passwordRecoveryController;