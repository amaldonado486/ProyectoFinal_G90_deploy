import { Router } from "express";
import {register} from "../controllers/userController.js";
import {getUsuarios,getUsuarioById,getPerfil,} from "../controllers/userController.js";
//import { requireAuth } from "../middleware/requireAuth.js";
import { requireAuth } from '../middleware/requireAuth.js';

const router = Router();

router.post("/register", register);

//router.get("/", getUsuarios);
router.get("/perfil", requireAuth, getPerfil);

router.get("/", requireAuth, getUsuarios);
router.get("/:id", requireAuth, getUsuarioById);

//router.get("/", requireAuth, async (req, res) => {
//  return res.json({ ok: true, user: req.user });
//});

export default router;
