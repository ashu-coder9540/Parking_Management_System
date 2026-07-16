// Step-2: Create app.js
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import errorHandler from "./middleware/errorMiddleWare.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swaggerConfig.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
    res.send("Parking API Running");
});

app.use(errorHandler);

export default app;