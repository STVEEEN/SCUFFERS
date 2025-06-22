import React, { useState } from "react";
import Sidebar from "../../components/UI/Sidebar/Sidebar"; // Importa el componente de la barra lateral
import SettingsButton from "../../components/UI/SettingsButton/SettingsButton"; // Importa el botón de configuración
import "./Employees.css";

const initialEmployees = [
  { 
    id: 1, 
    employee: "Eduardo Steven", 
    email: "eduardo@empresa.com", 
    address: "Calle 123, San Salvador", 
    dui: "12345678-9", 
    phoneNumber: "7890-1234" 
  },
  { 
    id: 2, 
    employee: "Emery Lovo", 
    email: "emery@empresa.com", 
    address: "Av. Principal 456", 
    dui: "98765432-1", 
    phoneNumber: "6789-4321" 
  },
  { 
    id: 3, 
    employee: "Fernando Huezo", 
    email: "fernando@empresa.com", 
    address: "Colonia Las Flores", 
    dui: "45612378-0", 
    phoneNumber: "6123-9876" 
  },
  { 
    id: 4, 
    employee: "Uliana Maite", 
    email: "uliana@empresa.com", 
    address: "Residencial San José", 
    dui: "32165498-7", 
    phoneNumber: "7654-0987" 
  },
  { 
    id: 5, 
    employee: "Lawne Yanal", 
    email: "lawne@empresa.com", 
    address: "Urbanización Moderna", 
    dui: "78912345-6", 
    phoneNumber: "7123-4567" 
  }
];

const Employees = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editValues, setEditValues] = useState({ 
    email: "", 
    address: "", 
    dui: "", 
    phoneNumber: "" 
  });

  const handleEditClick = (emp) => {
    setSelectedEmployee(emp.id);
    setEditValues({
      email: emp.email,
      address: emp.address,
      dui: emp.dui,
      phoneNumber: emp.phoneNumber
    });
  };

  const handleInputChange = (e) => {
    setEditValues({
      ...editValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveChanges = () => {
    if(selectedEmployee) {
      setEmployees(employees.map(emp => 
        emp.id === selectedEmployee ? { ...emp, ...editValues } : emp
      ));
    }
    setSelectedEmployee(null);
    setEditValues({ email: "", address: "", dui: "", phoneNumber: "" });
  };

  return (
    <div className="employees-container">
      <Sidebar />
      
      <div className="main-content">
        <div className="employees-header">
          <SettingsButton />
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
                  <span className="number">459</span>
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
                  <span className="number">329</span>
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
                  <span className="number">210</span>
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
                  <span className="number">67</span>
                  <span className="label">NEW EMPLOYEES</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla e Inputs - Modificados */}
          <div className="table-inputs-section">
            <h2>ACTIVITY OF EMPLOYEES</h2>
            
            <div className="table-container">
              <h3>RECENT REGISTRATIONS</h3>
              <table>
                <thead>
                  <tr>
                    <th>EMPLOYEE</th>
                    <th>EMAIL</th>
                    <th>ADDRESS</th>
                    <th>DUI</th>
                    <th>PHONE NUMBER</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(emp => (
                    <tr 
                      key={emp.id}
                      onClick={() => handleEditClick(emp)}
                      className={selectedEmployee === emp.id ? "selected-row" : ""}
                    >
                      <td className="employee-cell">
                        <span className="employee-icon">☑</span>
                        {emp.employee}
                      </td>
                      <td>{emp.email}</td>
                      <td>{emp.address}</td>
                      <td>{emp.dui}</td>
                      <td>{emp.phoneNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="inputs-container">
              <div className="inputss-grid">
                <div className="input-group">
                  <label>EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    value={editValues.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input-group">
                  <label>ADDRESS</label>
                  <input
                    type="text"
                    name="address"
                    value={editValues.address}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input-group">
                  <label>DUI</label>
                  <input
                    type="text"
                    name="dui"
                    value={editValues.dui}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input-group">
                  <label>PHONE NUMBER</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={editValues.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <button 
                className="keep-button"
                onClick={handleSaveChanges}
                disabled={!selectedEmployee}
              >
                KEEP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;