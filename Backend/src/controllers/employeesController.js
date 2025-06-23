import employeeModel from "../models/employees.js";
import bcryptjs from "bcryptjs";

const employeesController = {};

// Obtener solo empleados activos
employeesController.getEmployees = async (req, res) => {
  try {
    const employees = await employeeModel.find({ active: true });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Actualizar datos de un empleado (excepto contraseña)
employeesController.putEmployees = async (req, res) => {
  try {
    // Previene que se actualice la contraseña por aquí accidentalmente
    if ("password" in req.body) delete req.body.password;

    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Not Found" });
    }

    res.json({ message: "OK", updatedEmployee });
  } catch (error) {
    res.status(400).json({ message: "Bad Request", error });
  }
};

// Inactivar (soft delete) empleado
employeesController.inactivateEmployee = async (req, res) => {
  try {
    const updated = await employeeModel.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.json({ message: "Empleado inactivado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al inactivar empleado", error });
  }
};

// Cambiar contraseña de un empleado (solo admin)
employeesController.changeEmployeePassword = async (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ message: "Nueva contraseña requerida" });
  }

  try {
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    const updated = await employeeModel.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.json({ message: "Contraseña cambiada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al cambiar la contraseña", error });
  }
};

export default employeesController;