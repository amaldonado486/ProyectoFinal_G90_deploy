import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../src/bd.js";

export async function register(req, res) {
  try {
    const { username, email, fono, direccion, contrasena } = req.body;

    const hashed = await bcrypt.hash(contrasena, 10);

      console.log("register() controller HIT");

    if (!username || !email || !contrasena) {
      return res.status(400).json({ error: "Campos requeridos faltantes" });
    }

    const result = await pool.query(
      `INSERT INTO usuarios (username, email, fono, direccion, contrasena)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, username, email`,
      [username, email, fono, direccion, hashed]
    );

    res.status(201).json(result.rows[0]);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
}

export async function login(req, res) {
  try {
    console.log("LOGIN...:", req.body);
    const { email, contrasena } = req.body;

    const result = await pool.query(
      `SELECT id, username, email, fono, direccion, comuna,rol,contrasena FROM usuarios WHERE email = $1`,
      [email]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(contrasena, user.contrasena);
    if (!match) return res.status(401).json({ error: "Credenciales inválidas" });

    const token = jwt.sign(
      { id: user.id, email: user.email, rol:user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );


    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fono: user.fono,
        direccion: user.direccion,
        comuna: user.comuna,
        rol: user.rol,
      },
    });
  } catch (e) {
    console.error("LOGIN ERROR:", e);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
}
