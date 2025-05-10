import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstUserPage from "./pages/firstUserPage/FirstUser";
import Login from "./pages/loginPage/Login";
import PasswordRecovery from "./pages/passwordRecoveryPage/PasswordRecovery"; // Asegúrate de que la ruta es correcta

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstUserPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/passwordRecovery" element={<PasswordRecovery />} />
      </Routes>
    </Router>
  );
}
