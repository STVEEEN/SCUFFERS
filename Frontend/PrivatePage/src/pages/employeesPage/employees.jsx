import React, { useState, useEffect } from "react";
import Sidebar from "../../components/UI/Sidebar/Sidebar";
import SettingsButton from "../../components/UI/SettingsButton/SettingsButton";
import useDataEmployees from "../../hooks/useDataEmployees";
import toast from "react-hot-toast";
import "./Employees.css";

const Employees = () => {
  const {
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
    startEdit,
    resetForm,
    editEmployee,
    // Soft delete
    inactivateEmployee,
    // Password change
    adminPassword,
    setAdminPassword,
    confirmPassword,
    setConfirmPassword,
    passwordMessage,
    handlePasswordChange,
  } = useDataEmployees();

  // Para marcar la fila seleccionada en la tabla
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  // Obtener email e id del usuario logueado
  const userEmail = localStorage.getItem("userEmail");
  const userId = localStorage.getItem("userId");

  // Opcional: Si prefieres filtrar por ID en vez de email, cambia el filtro abajo
  const filterOutLoggedUser = emp => {
    // Por defecto, filtramos por email. Si prefieres por ID, descomenta la siguiente línea y comenta la actual.
    return emp.email !== userEmail;
    // return (emp._id || emp.id) !== userId;
  };

  const handleEditClick = (emp) => {
    startEdit(emp);
    setSelectedEmployeeId(emp._id || emp.id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "dui":
        setDui(value);
        break;
      case "phoneNumber":
        setPhoneNumber(value);
        break;
      case "birthday":
        setBirthday(value);
        break;
      case "hireDate":
        setHireDate(value);
        break;
      case "role":
        setRole(value);
        break;
      default:
        break;
    }
  };

  const handleSoftDelete = async () => {
    if (!selectedEmployeeId) return;
    if (window.confirm("¿Estás seguro que deseas inactivar este empleado? Esta acción puede revertirse reactivando desde base de datos.")) {
      await inactivateEmployee(selectedEmployeeId);
      setSelectedEmployeeId(null);
      resetForm();
    }
  };

  // Limpia el localStorage al cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userId");
    // Redirige o realiza cualquier otra acción de logout si lo deseas
    // Por ejemplo: window.location.href = "/login";
  };

  return (
    <div className="employees-container">
      <Sidebar />

      <div className="main-content">
        <div className="employees-header">
          <SettingsButton />
          {/* Botón de logout opcional, ponlo donde prefieras */}
          {/* <button onClick={handleLogout}>Cerrar sesión</button> */}
        </div>

        <div className="content-wrapper">
          {/* Cards Column - Sin modificaciones */}
          <div className="cards-column">
            <div className="employee-card">
              <div className="card-top">
                <div className="icon-left">
                  <img src="/src/img/Users.png" alt="Users" />
                </div>
                <div className="card-data">
                  <span className="number">{employees.length}</span>
                  <span className="label">TOTAL USERS</span>
                </div>
              </div>
            </div>

            <div className="employee-card">
              <div className="card-top">
                <div className="icon-left">
                  <img src="/src/img/Love.png" alt="Active" />
                </div>
                <div className="card-data">
                  <span className="number">{employees.filter(e => e.Role !== "Baja").length}</span>
                  <span className="label">ACTIVE EMPLOYEES</span>
                </div>
              </div>
            </div>

            <div className="employee-card">
              <div className="card-top">
                <div className="icon-left">
                  <img src="/src/img/Roto.png" alt="Not Subscribed" />
                </div>
                <div className="card-data">
                  <span className="number">{employees.filter(e => e.Role === "Baja").length}</span>
                  <span className="label">NOT EMPLOYEES</span>
                </div>
              </div>
            </div>

            <div className="employee-card">
              <div className="card-top">
                <div className="icon-left">
                  <img src="/src/img/UserMas.png" alt="New Users" />
                </div>
                <div className="card-data">
                  <span className="number">{employees.length > 0 ? 1 : 0}</span>
                  <span className="label">NEW EMPLOYEES</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla e Inputs */}
          <div className="table-inputs-section">
            <h2>ACTIVITY OF EMPLOYEES</h2>

            <div className="table-container">
              <h3>RECENT REGISTRATIONS</h3>
              {loading ? (
                <p>Cargando...</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>EMPLOYEE</th>
                      <th>EMAIL</th>
                      <th>ADDRESS</th>
                      <th>DUI</th>
                      <th>PHONE NUMBER</th>
                      <th>BIRTHDAY</th>
                      <th>HIRE DATE</th>
                      <th>ROLE</th>
                      <th>INACTIVAR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees
                      .filter(filterOutLoggedUser) // Oculta el usuario logueado
                      .map(emp => (
                        <tr
                          key={emp._id || emp.id}
                          onClick={() => handleEditClick(emp)}
                          className={selectedEmployeeId === (emp._id || emp.id) ? "selected-row" : ""}
                        >
                          <td className="employee-cell">
                            <span className="employee-icon">☑</span>
                            {emp.name || emp.employee}
                          </td>
                          <td>{emp.email}</td>
                          <td>{emp.address}</td>
                          <td>{emp.dui}</td>
                          <td>{emp.phoneNumber}</td>
                          <td>{emp.birthday ? emp.birthday.substring(0, 10) : ""}</td>
                          <td>{emp.hireDate ? emp.hireDate.substring(0, 10) : ""}</td>
                          <td>{emp.Role || emp.role}</td>
                          <td>
                            <button
                              style={{
                                padding: "6px 18px",
                                background: "#ff4d4f",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "bold"
                              }}
                              onClick={e => {
                                e.stopPropagation();
                                setSelectedEmployeeId(emp._id || emp.id);
                                handleSoftDelete();
                              }}
                            >
                              Inactivar
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="inputs-container">
              <div className="inputss-grid">
                <div className="input-group">
                  <label>EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    disabled={!selectedEmployeeId}
                  />
                </div>

                <div className="input-group">
                  <label>ADDRESS</label>
                  <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleInputChange}
                    disabled={!selectedEmployeeId}
                  />
                </div>

                <div className="input-group">
                  <label>DUI</label>
                  <input
                    type="text"
                    name="dui"
                    value={dui}
                    onChange={handleInputChange}
                    disabled={!selectedEmployeeId}
                  />
                </div>

                <div className="input-group">
                  <label>PHONE NUMBER</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleInputChange}
                    disabled={!selectedEmployeeId}
                  />
                </div>

                <div className="input-group">
                  <label>BIRTHDAY</label>
                  <input
                    type="date"
                    name="birthday"
                    value={birthday}
                    onChange={handleInputChange}
                    disabled={!selectedEmployeeId}
                  />
                </div>

                <div className="input-group">
                  <label>HIRE DATE</label>
                  <input
                    type="date"
                    name="hireDate"
                    value={hireDate}
                    onChange={handleInputChange}
                    disabled={!selectedEmployeeId}
                  />
                </div>

                <div className="input-group">
                  <label>ROLE</label>
                  <select
                    name="role"
                    value={role}
                    onChange={handleInputChange}
                    disabled={!selectedEmployeeId}
                  >
                    <option value="">Select role</option>
                    <option value="Employee">Employee</option>
                    <option value="Gerente">Gerente</option>
                    <option value="Bodeguero">Bodeguero</option>
                  </select>
                </div>
              </div>

              <button
                className="keep-button"
                onClick={handleUpdate}
                disabled={!selectedEmployeeId}
              >
                KEEP
              </button>
            </div>

            {selectedEmployeeId && (
              <div className="inputs-container" style={{ marginTop: 40 }}>
                <h4 style={{ marginBottom: 20 }}>Cambio de contraseña (Admin)</h4>
                <div className="inputss-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 40 }}>
                  <div className="input-group">
                    <label>NUEVA CONTRASEÑA</label>
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={e => setAdminPassword(e.target.value)}
                      placeholder="Nueva contraseña"
                    />
                  </div>
                  <div className="input-group">
                    <label>CONFIRMAR CONTRASEÑA</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Confirmar contraseña"
                    />
                  </div>
                </div>
                <button
                  className="keep-button"
                  onClick={handlePasswordChange}
                  style={{ marginTop: 30, position: "static" }}
                  disabled={!adminPassword || !confirmPassword}
                >
                  CAMBIAR CONTRASEÑA
                </button>
                {passwordMessage && (
                  <p style={{ marginTop: 15, color: passwordMessage === "¡Contraseña cambiada correctamente!" ? "green" : "red" }}>
                    {passwordMessage}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;