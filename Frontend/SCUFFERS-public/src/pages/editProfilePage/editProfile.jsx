// src/pages/editProfile/EditProfile.jsx
import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import SidebarMyAccount from "../../components/sidebarMyAccount/sidebarMyAccount";
import "./EditProfile.css";

const EditProfile = () => {
  const [activeCategory, setActiveCategory] = useState("EDIT PROFILE");

  return (
    <div className="editProfile-page">
      <Navbar />

      <div className="editProfile-content">
        <SidebarMyAccount
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <div className="editProfile-container">
          <h2 className="editProfile-title">EDIT PROFILE</h2>

          <form className="editProfile-form">
            <label className="editProfile-label">EMAIL</label>
            <input type="email" className="editProfile-input" required />

            <label className="editProfile-label">PASSWORD</label>
            <input type="password" className="editProfile-input" required />

            <label className="editProfile-label">CONFIRM PASSWORD</label>
            <input type="password" className="editProfile-input" required />

            <label className="editProfile-label">BIRTHDATE</label>
            <div className="editProfile-birthdate">
              <select required>
                <option value="">Day</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <select required>
                <option value="">Month</option>
                {[
                  "January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"
                ].map((month, i) => (
                  <option key={i} value={month}>{month}</option>
                ))}
              </select>
              <select required>
                <option value="">Year</option>
                {[...Array(106)].map((_, i) => {
                  const year = 2025 - i;
                  return <option key={year} value={year}>{year}</option>;
                })}
              </select>
            </div>

            <div className="editProfile-privacy">
              <input type="checkbox" required />
              <label>I accept the privacy information note</label>
            </div>

            <button type="submit" className="editProfile-button">UPDATE</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
