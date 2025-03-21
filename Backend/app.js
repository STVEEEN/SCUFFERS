import express from "express"
import employeesRoutes from "./src/routes/EmployeesRoutes.js"



const app = express();

app.use(express.json());

app.use("/api/employees", employeesRoutes)

export default app;