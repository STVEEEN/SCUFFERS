import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstUserPage from "./pages/firstUserPage/FirstUser";
import Login from "./pages/loginPage/Login";
import PasswordRecovery from "./pages/passwordRecoveryPage/PasswordRecovery";
import CodeConfirmation from "./pages/codeConfirmationPage/CodeConfirmation"; // Importa el componente
import NewPassword from "./pages/newPasswordPage/newPassword"; // Importa el componente

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstUserPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/passwordRecovery" element={<PasswordRecovery />} />
        <Route path="/codeConfirmation" element={<CodeConfirmation />} /> {/* Nueva ruta */}
        <Route path="/newPassword" element={<NewPassword />} /> {/* Nueva ruta */}
      </Routes>
    </Router>
  );
}
