import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstUser from "./pages/firstUserPage/firstUser";
import Products from "./pages/productsPage/products";
import ViewOfProduct from "./pages/viewOfProductPage/viewOfProduct";
import LoginAndRegister from "./pages/loginAndRegisterPage/loginAndRegister";
import VerifyEmail from "./pages/verifyEmail/verifyEmail";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<FirstUser />} />
          <Route path="/products" element={<Products />} />
          <Route path="/view-of-product" element={<ViewOfProduct />} />
          <Route path="/login-and-register" element={<LoginAndRegister />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;