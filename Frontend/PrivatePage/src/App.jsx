import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstUserPage from "./pages/firstUserPage/firstUser";
import Login from "./pages/loginPage/login";
import PasswordRecovery from "./pages/passwordRecoveryPage/PasswordRecovery";
import CodeConfirmation from "./pages/codeConfirmationPage/CodeConfirmation";
import NewPassword from "./pages/newPasswordPage/NewPassword";
import Settings from "./pages/SettingsPage/Settings";
import AddProducts from "./pages/addProductsPage/addProducts";
import Stats from "./pages/statsPage/Stats"; // Nueva página de estadísticas
import Users from "./pages/usersPage/users";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstUserPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/passwordRecovery" element={<PasswordRecovery />} />
        <Route path="/codeConfirmation" element={<CodeConfirmation />} />
        <Route path="/newPassword" element={<NewPassword />} />
        <Route path="/stats" element={<Stats />} /> 
        <Route path="/addproducts" element={<AddProducts />} />
       <Route path="/Settings" element={<Settings />} />  
        <Route path="/Users" element={<Users />} />  {/* Página de usuarios */}
      </Routes>
    </Router>
  );
}