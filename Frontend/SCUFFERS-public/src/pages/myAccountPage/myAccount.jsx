// src/pages/myAccount/MyAccount.jsx
import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import SidebarMyAccount from "../../components/sidebarMyAccount/sidebarMyAccount";
import "./MyAccount.css";

const MyAccount = () => {
  const [activeCategory, setActiveCategory] = useState(null); // sin valor activo por defecto

  return (
    <div className="my-account-page">
      <Navbar />
      <div className="my-account-content">
        <SidebarMyAccount
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <div className="account-details">
          <h2 className="account-title">My Account</h2>
          {/* No hay contenido adicional mientras no se seleccione una categoría */}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
