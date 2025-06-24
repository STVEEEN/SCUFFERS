import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstUser from "./pages/firstUserPage/firstUser";
import Products from "./pages/productsPage/products";
import ViewOfProduct from "./pages/viewOfProductPage/viewOfProduct";
import LoginAndRegister from "./pages/loginAndRegisterPage/loginAndRegister";
import VerifyEmail from "./pages/verifyEmail/verifyEmail";
import PasswordRecovery from "./pages/passwordRecoveryPage/PasswordRecovery";
import ShoppingCart from "./pages/shoppingCartPage/shoppingCart";
import MyAccount from "./pages/myAccountPage/myAccount";
import EditProfile from "./pages/editProfilePage/editProfile";
import MyAddress from "./pages/myAddressPage/myAddress";
import MyOrders from "./pages/myOrdersPage/myOrders";
import PaymentMethod from "./pages/paymentMethodPage/paymentMethod";
import { CartProvider } from "./context/cartContext";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<FirstUser />} />
            <Route path="/products" element={<Products />} />
            <Route path="/view-of-product" element={<ViewOfProduct />} />
            <Route path="/login-and-register" element={<LoginAndRegister />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/recover" element={<PasswordRecovery />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/my-address" element={<MyAddress />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/payment-method" element={<PaymentMethod />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;