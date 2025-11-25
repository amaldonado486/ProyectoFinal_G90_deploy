//import { pool } from "../bd/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../src/bd.js";



export async function getPerfil(req, res) {
  try {
    const userId = req.user.id;

    // Obtener  usuario
    const user = await pool.query(
      `SELECT id, username, email, fono, direccion, rol, fecha_creacion
       FROM usuarios WHERE id = $1`,
      [userId]
    );

    if (!user.rows.length)
      return res.status(404).json({ error: "Usuario no encontrado" });

    // historial de ordenes
    const orders = await pool.query(
      `SELECT * FROM pedidos WHERE user_id = $1 ORDER BY fecha_creacion DESC`,
      [userId]
    );

    // items por orden
    const items = await pool.query(
      `SELECT pi.id_pedido, pi.id_producto, pi.cantidad, pi.precio, p.nombre
       FROM pedidos_items pi
       LEFT JOIN productos p ON p.id = pi.id_producto
       WHERE pi.id_pedido IN (SELECT id FROM pedidos WHERE user_id = $1)`,
      [userId]
    );

    res.json({
      user: user.rows[0],
      orders: orders.rows,
      orderItems: items.rows,
    });
  } catch (e) {
    console.error("GET PERFIL ERROR:", e);
    res.status(500).json({ error: "Error al obtener perfil" });
  }
}

export async function getUsuarios(req, res) {
  try {
    const result = await pool.query(
      `SELECT id, username, email, fono, direccion, rol, fecha_creacion
       FROM usuarios ORDER BY id ASC`
    );

    res.json(result.rows);
  } catch (e) {
    console.error("GET USUARIOS ERROR:", e);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
}


export async function getUsuarioById(req, res) {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT id, username, email, fono, direccion, rol, fecha_creacion
       FROM usuarios WHERE id = $1`,
      [id]
    );

    if (!result.rows.length)
      return res.status(404).json({ error: "Usuario no encontrado" });

    res.json(result.rows[0]);
  } catch (e) {
    console.error("GET USUARIO BY ID ERROR:", e);
    res.status(500).json({ error: "Error al obtener usuario" });
  }
}

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { fono, direccion, comuna } = req.body;

    const result = await pool.query(
      `UPDATE usuarios
       SET fono = $1,
           direccion = $2,
           comuna = $3
       WHERE username = $4
       RETURNING id, username, email, fono, direccion, comuna`,
      [fono, direccion, comuna, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario actualizado", user: result.rows[0] });
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    res.status(500).json({ message: "Error actualizando usuario" });
  }
};
