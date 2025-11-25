import { pool } from '../src/bd.js';

// GET /api/cart  -> listar items
export async function getCart(req, res) {
  const userId = req.user.id;
  const client = await pool.connect();
  try {
    const q = `SELECT ci.id, ci.id_producto, ci.cantidad, k.nombre, k.precio, k.imagen_kit
               FROM carrito_item ci
               LEFT JOIN productos k ON k.id = ci.id_producto
               WHERE ci.id_user = $1`;
    const r = await client.query(q, [userId]);
    res.json(r.rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'BD error' });
  } finally { client.release(); }
}

// POST /api/cart  Para actualizar cantidad de carrito por id
export async function addToCart(req, res) {
  const userId = req.user.id;
  const {id_producto, cantidad } = req.body;
  const client = await pool.connect();
  try {
    // if exists, increment
    const exists = await client.query('SELECT id, cantidad FROM carrito_item WHERE id_user=$1 AND id_producto=$2', [userId, id_producto]);

    if (exists.rowCount > 0) {
      const newCantidad = exists.rows[0].cantidad + (cantidad || 1);
      await client.query('UPDATE carrito_item SET cantidad=$1 WHERE id=$2', [newCantidad, exists.rows[0].id]);
      return res.json({ ok: true });
    }
    await client.query('INSERT INTO carrito_item (id_user, id_producto, cantidad) VALUES ($1,$2,$3)', [userId, id_producto, cantidad || 1]);
    res.status(201).json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'BD error' });
  } finally { client.release(); }
}

export async function updateCartItem(req, res) {
  const userId = req.user.id;
  const id = req.params.id;
  const { cantidad } = req.body;

  console.log("updateCartItem body:", req.body);

  if (!cantidad || isNaN(cantidad)) {
    return res.status(400).json({ error: "Cantidad inválida" });
  }

  const client = await pool.connect();
  try {
    await client.query('UPDATE carrito_item SET cantidad=$1 WHERE id=$2 AND id_user=$3', [cantidad, id, userId]);
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'BD error' });
  } finally { client.release(); }
}

export async function removeCartItem(req, res) {
  const userId = req.user.id;
  const id = req.params.id;
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM carrito_item WHERE id=$1 AND id_user=$2', [id, userId]);
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'BD error' });
  } finally { client.release(); }
}

export async function clearCart(req, res) {
  const userId = req.user.id;
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM carrito_item WHERE id_user=$1', [userId]);
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'BD error' });
  } finally { client.release(); }
}
