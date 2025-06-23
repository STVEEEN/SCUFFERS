import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstUser from "./pages/firstUserPage/firstUser";
import Products from "./pages/productsPage/products";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<FirstUser />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;