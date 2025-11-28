import express from "express";
import cors from "cors";
import dotenv from "dotenv"
//import { pool } from "./src/bd.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartsRoutes from "./routes/carts.js";
import kitsRoutes from "./routes/kits.js";
import ordersRoutes from "./routes/orders.js";

dotenv.config();

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL

app.use(express.json());

app.use(cors({
  origin: FRONTEND_URL, //'http://localhost:5173',  
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/carts", cartsRoutes);
app.use("/api/kits", kitsRoutes);
app.use("/api/orders", ordersRoutes);
//console.log("ordersRoutes cargado");
app.get("/", (req, res) => {
  res.send("API Online");
});

//const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => console.log(`Servidor activo en http://localhost:${PORT}`));

export default app;

