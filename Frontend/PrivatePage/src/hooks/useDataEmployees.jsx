import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const EMPLOYEES_API = "http://localhost:4000/api/employees";

export default function useDataEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  // Formulario de edición
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dui, setDui] = useState("");
  const [role, setRole] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);

  // Cambio de contraseña admin
  const [adminPassword, setAdminPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  // Fetch empleados
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await fetch(EMPLOYEES_API, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Error al obtener empleados");
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      toast.error("Error al cargar empleados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Actualizar empleado
  const handleUpdate = async (e) => {
    e && e.preventDefault();
    setLoading(true);
    if (!id) {
      toast.error("Selecciona un empleado para editar");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${EMPLOYEES_API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          birthday,
          email,
          address,
          hireDate,
          phoneNumber,
          dui,
          role,
        }),
      });
      if (!res.ok) throw new Error("Error al actualizar empleado");
      toast.success("Empleado actualizado");
      resetForm();
      fetchEmployees();
    } catch (error) {
      toast.error("Error al actualizar empleado");
    } finally {
      setLoading(false);
    }
  };

  // Inactivar (soft delete) empleado
  const inactivateEmployee = async (employeeId) => {
    setLoading(true);
    try {
      const res = await fetch(`${EMPLOYEES_API}/inactivate/${employeeId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Error al inactivar empleado");
      toast.success("Empleado inactivado");
      fetchEmployees();
    } catch (error) {
      toast.error("Error al inactivar empleado");
    } finally {
      setLoading(false);
    }
  };

  // Iniciar edición (cargar datos en formulario)
  const startEdit = (emp) => {
    setId(emp._id || emp.id);
    setName(emp.name || emp.employee || "");
    setBirthday(emp.birthday ? emp.birthday.substring(0, 10) : "");
    setEmail(emp.email || "");
    setAddress(emp.address || "");
    setHireDate(emp.hireDate ? emp.hireDate.substring(0, 10) : "");
    setPhoneNumber(emp.phoneNumber || "");
    setDui(emp.dui || "");
    setRole(emp.Role || emp.role || "");
    setEditEmployee(emp);
    setPasswordMessage("");
    setAdminPassword("");
    setConfirmPassword("");
  };

  // Resetear formulario
  const resetForm = () => {
    setId("");
    setName("");
    setBirthday("");
    setEmail("");
    setAddress("");
    setHireDate("");
    setPhoneNumber("");
    setDui("");
    setRole("");
    setEditEmployee(null);
    setPasswordMessage("");
    setAdminPassword("");
    setConfirmPassword("");
  };

  // Cambio de contraseña de empleado (solo admin)
  const handlePasswordChange = async () => {
    if (!adminPassword || !confirmPassword) {
      setPasswordMessage("Debes llenar ambos campos.");
      return;
    }
    if (adminPassword.length < 6) {
      setPasswordMessage("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (adminPassword !== confirmPassword) {
      setPasswordMessage("Las contraseñas no coinciden.");
      return;
    }
    try {
      const res = await fetch(`${EMPLOYEES_API}/change-password/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ newPassword: adminPassword }),
      });
      if (!res.ok) throw new Error("Error al cambiar la contraseña");
      setPasswordMessage("¡Contraseña cambiada correctamente!");
      setAdminPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordMessage("Error al cambiar la contraseña.");
    }
  };

  return {
    employees,
    loading,
    id,
    setId,
    name,
    setName,
    birthday,
    setBirthday,
    email,
    setEmail,
    address,
    setAddress,
    hireDate,
    setHireDate,
    phoneNumber,
    setPhoneNumber,
    dui,
    setDui,
    role,
    setRole,
    handleUpdate,
    inactivateEmployee,
    startEdit,
    resetForm,
    editEmployee,
    // Para cambio de contraseña
    adminPassword,
    setAdminPassword,
    confirmPassword,
    setConfirmPassword,
    passwordMessage,
    handlePasswordChange,
  };
}