import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import SettingsButton from "../../components/SettingsButton/SettingsButton";
import "./Users.css";

const initialUsers = [
  { id: 1, buyer: "Eduardo Steven", joinDate: "09/03/2025", age: 18, gender: "Male", membership: "Bronze" },
  { id: 2, buyer: "Emely Lovo", joinDate: "11/02/2025", age: 18, gender: "Female", membership: "Bronze" },
  { id: 3, buyer: "Fernando Huezo", joinDate: "18/01/2025", age: 19, gender: "Male", membership: "Gold" },
  { id: 4, buyer: "Liliana Maite", joinDate: "01/02/2025", age: 18, gender: "Female", membership: "None" },
  { id: 5, buyer: "Lamine Yamal", joinDate: "11/05/2025", age: 17, gender: "Male", membership: "Diamond" }
];

const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editValues, setEditValues] = useState({ buyer: "", joinDate: "", age: "", gender: "", membership: "" });

  const handleEditClick = (user) => {
    setSelectedUser(user.id);
    setEditValues(user);
  };

  const handleInputChange = (e) => {
    setEditValues({
      ...editValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveChanges = () => {
    setUsers(users.map(user => user.id === selectedUser ? { ...user, ...editValues } : user));
    setSelectedUser(null);
  };

  return (
    <div className="users-container">
      {/* Sidebar fijo */}
      <Sidebar />

      {/* Área de contenido, separada del Sidebar */}
      <div className="users-content">
        <div className="users-header">
          <SettingsButton />
        </div>

        {/* Encabezado para la actividad de usuarios */}
        <div className="activity-header">
          <h2>ACTIVITY OF USERS</h2>
        </div>

        <div className="users-layout">
          {/* Cards (Se quedan intactas) */}
          <div className="cards-column">
            <div className="user-card">
              <div className="card-top">
                <div className="icon-left">
                  <img src="/src/img/Users.png" alt="Users Icon" />
                </div>
                <div className="icon-center">
                  <img src="/src/img/459.png" alt="Data Icon" />
                </div>
              </div>
              <div className="card-bottom">
                <span className="card-text">TOTAL USERS</span>
              </div>
            </div>
            
            <div className="user-card">
              <div className="card-top">
                <div className="icon-left">
                  <img src="/src/img/Love.png" alt="Active Icon" />
                </div>
                <div className="icon-center">
                  <img src="/src/img/329.png" alt="Active Data Icon" />
                </div>
              </div>
              <div className="card-bottom">
                <span className="card-text">ACTIVE USER</span>
              </div>
            </div>

            <div className="user-card">
              <div className="card-top">
                <div className="icon-left">
                  <img src="/src/img/Roto.png" alt="Not Subscribed Icon" />
                </div>
                <div className="icon-center">
                  <img src="/src/img/210.png" alt="Not Subscribed Data Icon" />
                </div>
              </div>
              <div className="card-bottom">
                <span className="card-text">NOT SUBSCRIBED</span>
              </div>
            </div>

            <div className="user-card">
              <div className="card-top">
                <div className="icon-left">
                  <img src="/src/img/UserMas.png" alt="New Users Icon" />
                </div>
                <div className="icon-center">
                  <img src="/src/img/67.png" alt="New Users Data Icon" />
                </div>
              </div>
              <div className="card-bottom">
                <span className="card-text">NEW USERS</span>
              </div>
            </div>
          </div>

          {/* Tabla de usuarios */}
          <div className="users-table-container">
            <h3>RECENT REGISTERS</h3>
            <table>
              <thead>
                <tr>
                  <th>BUYER</th>
                  <th>JOIN DATE</th>
                  <th>AGE</th>
                  <th>GENDER</th>
                  <th>MEMBERSHIP</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="buyer-icon">
                      <img src="/src/img/userIcon.png" alt="User Icon" />
                      {user.buyer}
                    </td>
                    <td>{user.joinDate}</td>
                    <td>{user.age}</td>
                    <td>{user.gender}</td>
                    <td>{user.membership}</td>
                    <td className="edit-icon">
                      <button onClick={() => handleEditClick(user)}>
                        <img src="/src/img/editIcon.png" alt="Edit Icon" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Inputs debajo de la tabla */}
            {selectedUser && (
              <div className="edit-form">
                <h4>EDIT USER</h4>
                <input type="date" name="joinDate" value={editValues.joinDate} onChange={handleInputChange} />
                <input type="number" name="age" value={editValues.age} onChange={handleInputChange} placeholder="Age" />
                <select name="gender" value={editValues.gender} onChange={handleInputChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <select name="membership" value={editValues.membership} onChange={handleInputChange}>
                  <option value="Bronze">Bronze</option>
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Diamond">Diamond</option>
                </select>
                <button onClick={handleSaveChanges}>KEEP</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
