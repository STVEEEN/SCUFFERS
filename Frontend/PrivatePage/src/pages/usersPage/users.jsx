import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import SettingsButton from "../../components/SettingsButton/SettingsButton";
import "./Users.css";

const initialUsers = [
  { id: 1, buyer: "Eduardo Steven", joinDate: "09/03/2025", age: 18, gender: "Male", membership: "BROKCE" },
  { id: 2, buyer: "Emery Lovo", joinDate: "11/02/2025", age: 18, gender: "Female", membership: "BROKCE" },
  { id: 3, buyer: "Fernando Huezo", joinDate: "10/01/2025", age: 19, gender: "Male", membership: "GOLD" },
  { id: 4, buyer: "Uliana Maite", joinDate: "01/02/2025", age: 18, gender: "Female", membership: "NONE" },
  { id: 5, buyer: "Lawne Yanal", joinDate: "11/05/2025", age: 17, gender: "Male", membership: "DIAMONO" }
];

const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editValues, setEditValues] = useState({ 
    joinDate: "", 
    age: "", 
    gender: "", 
    membership: "" 
  });

  const handleEditClick = (user) => {
    setSelectedUser(user.id);
    setEditValues({
      joinDate: user.joinDate,
      age: user.age,
      gender: user.gender,
      membership: user.membership
    });
  };

  const handleInputChange = (e) => {
    setEditValues({
      ...editValues,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveChanges = () => {
    if(selectedUser) {
      setUsers(users.map(user => 
        user.id === selectedUser ? { ...user, ...editValues } : user
      ));
    }
    setSelectedUser(null);
    setEditValues({ joinDate: "", age: "", gender: "", membership: "" });
  };

  return (
    <div className="users-container">
      <Sidebar />
      
      <div className="main-content">
        <div className="users-header">
          <SettingsButton />
        </div>

        <div className="content-wrapper">
          {/* Cards Column */}
          <div className="cards-column">
            <div className="user-card">
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

            <div className="user-card">
              <div className="card-top">
                <div className="icon-left">
                  <img src="/src/img/Love.png" alt="Active" />
                </div>
                <div className="card-data">
                  <span className="number">329</span>
                  <span className="label">ACTIVE USER</span>
                </div>
              </div>
            </div>

            <div className="user-card">
              <div className="card-top">
                <div className="icon-left">
                  <img src="/src/img/Roto.png" alt="Not Subscribed" />
                </div>
                <div className="card-data">
                  <span className="number">210</span>
                  <span className="label">NOT SUBSCRIBED</span>
                </div>
              </div>
            </div>

            <div className="user-card">
              <div className="card-top">
                <div className="icon-left">
                  <img src="/src/img/UserMas.png" alt="New Users" />
                </div>
                <div className="card-data">
                  <span className="number">67</span>
                  <span className="label">NEW USERS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabla e Inputs */}
          <div className="table-inputs-section">
            <h2>ACTIVITY OF USERS</h2>
            
            <div className="table-container">
              <h3>RECENT REGISTERS</h3>
              <table>
                <thead>
                  <tr>
                    <th>BOYER</th>
                    <th>JON DATE</th>
                    <th>AGE</th>
                    <th>GENDER</th>
                    <th>MEMBERSHIP</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr 
                      key={user.id}
                      onClick={() => handleEditClick(user)}
                      className={selectedUser === user.id ? "selected-row" : ""}
                    >
                      <td className="buyer-cell">
                        <span className="user-icon">☑</span>
                        {user.buyer}
                      </td>
                      <td>{user.joinDate}</td>
                      <td>{user.age}</td>
                      <td>{user.gender}</td>
                      <td>{user.membership}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="inputs-container">
              <div className="inputs-grid">
                <div className="input-group">
                  <label>JON DATE</label>
                  <input
                    type="date"
                    name="joinDate"
                    value={editValues.joinDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input-group">
                  <label>AGE</label>
                  <input
                    type="number"
                    name="age"
                    value={editValues.age}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="input-group">
                  <label>GENDER</label>
                  <select
                    name="gender"
                    value={editValues.gender}
                    onChange={handleInputChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="input-group">
                  <label>MEMBERSHIP</label>
                  <select
                    name="membership"
                    value={editValues.membership}
                    onChange={handleInputChange}
                  >
                    <option value="BROKCE">BROKCE</option>
                    <option value="GOLD">GOLD</option>
                    <option value="DIAMONO">DIAMONO</option>
                    <option value="NONE">NONE</option>
                  </select>
                </div>
              </div>
              
              <button 
                className="keep-button"
                onClick={handleSaveChanges}
                disabled={!selectedUser}
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

export default Users;