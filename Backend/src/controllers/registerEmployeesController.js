import employeesModel from "../models/employees.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const registerEmployeesController = {};

registerEmployeesController.registerEmployee = async (req, res) => {
  // Extrae los campos según tu modelo
  const {
    name,
    birthday,
    email,
    address,
    hireDate,
    password,
    phoneNumber,
    dui,
    Role,   // Puede ser opcional, por defecto "Employee"
    active  // Nuevo campo, opcional, por defecto true
  } = req.body;

  // Validación de campos requeridos
  if (
    !name ||
    !birthday ||
    !email ||
    !address ||
    !hireDate ||
    !password ||
    !phoneNumber ||
    !dui
  ) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  try {
    // ¿Ya existe el empleado?
    const existingEmployee = await employeesModel.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "El correo electrónico ya está registrado." });
    }

    // Hash de contraseña
    const passwordHash = await bcryptjs.hash(password, 10);

    // Crea el nuevo empleado con todos los campos
    const newEmployee = new employeesModel({
      name,
      birthday,
      email,
      address,
      hireDate,
      password: passwordHash,
      phoneNumber,
      dui,
      Role,                  // opcional, si no lo mandas, toma el default ("Employee")
      active: active !== undefined ? active : true // por defecto true si no se manda
    });
    await newEmployee.save();

    // Crea el token y responde
    jsonwebtoken.sign(
      { id: newEmployee._id, role: newEmployee.Role, email: newEmployee.email },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn },
      (error, token) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: "Error generando token" });
        }
        res.cookie("authToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 30 * 24 * 60 * 60 * 1000 // 30 días
        });
        res.json({ message: "Empleado registrado correctamente", token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

export default registerEmployeesController;