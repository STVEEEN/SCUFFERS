import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
// Importing routes
import employeesRoutes from "./src/routes/employeesRoutes.js"
import userRoutes from "./src/routes/userRoutes.js"
import categoriesRoutes from "./src/routes/categoriesRoutes.js"
import productsRoutes from "./src/routes/productsRoutes.js"
import cartRoutes from "./src/routes/cartRoutes.js"
import orderRoutes from "./src/routes/orderRoutes.js"
import paymentsRoutes from "./src/routes/paymentsRoutes.js"
import loginEmployeeRoutes from "./src/routes/loginEmployee.js";
import registerEmployeesRoute from "./src/routes/registerEmployeesRoute.js";
import passwordRecoveryRoutes from "./src/routes/passwordRecovery.js";
//APP WEB
import registerUserRoutes from "./src/routes/registerUserRoutes.js";
import authUserRoutes from "./src/routes/authUserRoutes.js";

const app = express();

const corsOptions = {
    origin: "http://localhost:5173",  
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Permitir envío de cookies y credenciales
  };
app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/api/employees", employeesRoutes);
app.use("/api/registerEmployees", registerEmployeesRoute);
app.use("/api/user", userRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);

app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/payments", paymentsRoutes);

app.use("/api/login", loginEmployeeRoutes);
app.use("/api/passwordRecovery", passwordRecoveryRoutes);

//APP WEB
app.use("/api/registerUser", registerUserRoutes);
app.use("/api/authUser", authUserRoutes);

export default app;