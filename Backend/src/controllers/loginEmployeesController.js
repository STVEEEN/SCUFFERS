import employeesModel from "../models/employees.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const loginEmployeesController = {
  login: async (req, res) => {
    // Validar que el body existe
    if (!req.body) {
      return res.status(400).json({ 
        message: "Datos de login no proporcionados" 
      });
    }

    const { email, password } = req.body;

    // Validar campos requeridos
    if (!email || !password) {
      return res.status(400).json({ 
        message: "Email y contraseña son requeridos" 
      });
    }

    try {
      let userFound = null;
      let userRole = null;
      let userId = null;

      // 1. Admin absoluto (desde config)
      if (
        email === config.emailAdmin.email &&
        password === config.emailAdmin.password
      ) {
        userRole = "Admin";
        userId = "admin";
        userFound = { _id: "admin" };
        console.log("Acceso como admin absoluto");
      } else {
        // 2. Buscar empleado en la base de datos
        userFound = await employeesModel.findOne({ email }).select('+password');
        
        if (!userFound) {
          console.log("Usuario no encontrado");
          return res.status(401).json({ 
            message: "Usuario o contraseña incorrectos" 
          });
        }

        // Validar contraseña
        const isMatch = await bcryptjs.compare(password, userFound.password);
        if (!isMatch) {
          console.log("Contraseña incorrecta");
          return res.status(401).json({ 
            message: "Usuario o contraseña incorrectos" 
          });
        }

        userRole = userFound.Role;
        userId = userFound._id;
      }

      // Validar rol del usuario
      if (!["Admin", "Gerente", "Empleado", "Bodeguero"].includes(userRole)) {
        console.log("Rol no autorizado:", userRole);
        return res.status(403).json({ 
          message: "No tienes permisos para acceder" 
        });
      }

      // Generar token JWT
      const tokenPayload = { 
        id: userId, 
        role: userRole,
        email: email
      };

      const token = jsonwebtoken.sign(
        tokenPayload,
        config.JWT.secret,
        { expiresIn: config.JWT.expiresIn }
      );

      // Configurar cookie segura
      res.cookie("authToken", token, { 
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 días
      });

      // Respuesta exitosa
      res.json({
        message: "Login exitoso",
        role: userRole,
        id: userId,
        email: email,
        token: token // Opcional: enviar también en la respuesta
      });

    } catch (error) {
      console.error("ERROR EN LOGIN:", error);
      res.status(500).json({ 
        message: "Error en el servidor",
        error: process.env.NODE_ENV === "development" ? error.message : undefined
      });
    }
  },

  logout: (req, res) => {
    // Limpiar cookie de autenticación
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });
    
    res.json({ message: "Logout exitoso" });
  }
};

export default loginEmployeesController;