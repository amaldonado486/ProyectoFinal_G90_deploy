import express from "express";
import {register, login} from "../controllers/authController.js";
import jwt from "jsonwebtoken";

const router = express.Router();

console.log(" authRoutes loaded");

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer "))
    return res.status(401).json({ error: "Sin token" });

  const token = header.replace("Bearer ", "");

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    next();
  } catch (e) {
    res.status(401).json({ error: "Token inválido" });
  }
}

router.post("/register", register);

// POST /auth/login
router.post("/login", login);  
 


export default router;

