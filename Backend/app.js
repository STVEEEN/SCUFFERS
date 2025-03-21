import express from "express"
import employeesRoutes from "./src/routes/EmployeesRoutes.js"
import userRoutes from "./src/routes/userRoutes.js"

const app = express();

app.use(express.json());

app.use("/api/employees", employeesRoutes)
app.use("./api/user", userRoutes)

export default app;