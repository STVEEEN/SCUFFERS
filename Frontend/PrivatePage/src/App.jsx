import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstUserPage from "./pages/firstUserPage/FirstUser";
import Login from "./pages/loginPage/login";
import PasswordRecovery from "./pages/passwordRecoveryPage/PasswordRecovery"; // Asegúrate de que la ruta es correcta
import CodeConfirmation from "./pages/codeConfirmationPage/codeConfirmation"; // Importa el componente

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstUserPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/passwordRecovery" element={<PasswordRecovery />} />
        <Route path="/codeConfirmation" element={<CodeConfirmation />} /> {/* Nueva ruta */}
      </Routes>
    </Router>
  );
}
