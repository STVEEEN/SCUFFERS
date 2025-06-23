import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstUser from "./pages/firstUserPage/firstUser";
import Products from "./pages/productsPage/products";
import ViewOfProduct from "./pages/viewOfProductPage/viewOfProduct";
import LoginAndRegister from "./pages/loginAndRegisterPage/loginAndRegister";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<FirstUser />} />
          <Route path="/products" element={<Products />} />
          <Route path="/viewOfProduct" element={<ViewOfProduct />} />
          <Route path="/loginAndRegister" element={<LoginAndRegister />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;