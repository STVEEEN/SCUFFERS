import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstUserPage from "./pages/firstUserPage/FirstUser";
import Login from "./pages/loginPage/Login";
import PasswordRecovery from "./pages/passwordRecoveryPage/PasswordRecovery";
import CodeConfirmation from "./pages/codeConfirmationPage/CodeConfirmation";
import NewPassword from "./pages/newPasswordPage/NewPassword";
import Settings from "./pages/SettingsPage/Settings";
import Stats from "./pages/statsPage/Stats"; // Nueva página de estadísticas

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
        <Route path="/Settings" element={<Settings />} /> 
      </Routes>
    </Router>
  );
}
