import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstUserPage from "./pages/firstUserPage/firstUser";
import Login from "./pages/loginPage/login";
import PasswordRecovery from "./pages/passwordRecoveryPage/PasswordRecovery";
import CodeConfirmation from "./pages/codeConfirmationPage/CodeConfirmation";
import NewPassword from "./pages/newPasswordPage/NewPassword";
import Settings from "./pages/SettingsPage/Settings";
import AddProducts from "./pages/addProductsPage/addProducts";
import Stats from "./pages/statsPage/Stats";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import Stock from "./pages/stockPage/stock";
import Users from "./pages/usersPage/users";
import Employees from "./pages/employeesPage/employees";
import Orders from "./pages/ordersPage/orders";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./context/protectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FirstUserPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/passwordRecovery" element={<PasswordRecovery />} />
          <Route path="/codeConfirmation" element={<CodeConfirmation />} />
          <Route path="/newPassword" element={<NewPassword />} />

          {/* Only Admin and Gerente */}
          <Route
            path="/stats"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Gerente"]}>
                <Stats />
              </ProtectedRoute>
            }
          />

          {/* Only Admin */}
          <Route
            path="/Employees"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Employees />
              </ProtectedRoute>
            }
          />

          {/* Only Admin */}
          <Route
            path="/Users"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Users />
              </ProtectedRoute>
            }
          />

          {/* Orders: Admin, Gerente, Employee */}
          <Route
            path="/Orders"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Gerente", "Employee"]}>
                <Orders />
              </ProtectedRoute>
            }
          />

          {/* Products, Categories, Stock: Admin, Gerente, Employee, Bodeguero */}
          <Route
            path="/addproducts"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Gerente", "Employee", "Bodeguero"]}>
                <AddProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Gerente", "Employee", "Bodeguero"]}>
                <CategoriesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Stock"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Gerente", "Employee", "Bodeguero"]}>
                <Stock />
              </ProtectedRoute>
            }
          />

          {/* Settings: Admin, Gerente, Employee */}
          <Route
            path="/Settings"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Gerente", "Employee"]}>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}