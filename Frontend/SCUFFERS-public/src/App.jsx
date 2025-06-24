import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstUser from "./pages/firstUserPage/firstUser";
import Products from "./pages/productsPage/products";
import ViewOfProduct from "./pages/viewOfProductPage/viewOfProduct";
import LoginAndRegister from "./pages/loginAndRegisterPage/loginAndRegister";
<<<<<<< HEAD
import VerifyEmail from "./pages/verifyEmail/verifyEmail";
=======
import PasswordRecovery from "./pages/passwordRecoveryPage/PasswordRecovery";
import ShoppingCart from "./pages/shoppingCartPage/shoppingCart";
import MyAccount from "./pages/myAccountPage/myAccount";
import EditProfile from "./pages/editProfilePage/editProfile";
import MyAddress from "./pages/myAddressPage/myAddress";
import MyOrders from "./pages/myOrdersPage/myOrders";
import PaymentMethod from "./pages/paymentMethodPage/paymentMethod"; // ✅ nueva importación
import { CartProvider } from "./context/cartContext"; // ✅ Provider del contexto del carrito
>>>>>>> 1419a7bb3d75b9d34a9b8fb5b6a90813484dc934
import "./App.css";

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <div className="App">
        <Routes>
          <Route path="/" element={<FirstUser />} />
          <Route path="/products" element={<Products />} />
          <Route path="/view-of-product" element={<ViewOfProduct />} />
          <Route path="/login-and-register" element={<LoginAndRegister />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </div>
=======
      <CartProvider> {/* ✅ Provee acceso global al carrito */}
        <div className="App">
          <Routes>
            <Route path="/" element={<FirstUser />} />
            <Route path="/products" element={<Products />} />
            <Route path="/viewOfProduct" element={<ViewOfProduct />} />
            <Route path="/loginAndRegister" element={<LoginAndRegister />} />
            <Route path="/recover" element={<PasswordRecovery />} />
            <Route path="/shoppingCart" element={<ShoppingCart />} />
            <Route path="/myAccount" element={<MyAccount />} />
            <Route path="/editProfile" element={<EditProfile />} />
            <Route path="/myAddress" element={<MyAddress />} />
            <Route path="/myOrders" element={<MyOrders />} />
            <Route path="/paymentMethod" element={<PaymentMethod />} />
          </Routes>
        </div>
      </CartProvider>
>>>>>>> 1419a7bb3d75b9d34a9b8fb5b6a90813484dc934
    </Router>
  );
}

export default App;
