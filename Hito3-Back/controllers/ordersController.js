import { pool } from '../src/bd.js';

export async function createOrder(req, res) {
  const client = await pool.connect();
  const userId = req.user.id;
  try {
    await client.query("BEGIN");

    // 1) Obtener items del carrito
    const cart = await client.query(
      `SELECT ci.id_producto, ci.cantidad, p.precio
       FROM carrito_item ci
       JOIN productos p ON p.id = ci.id_producto
       WHERE ci.id_user = $1`,
      [userId]
    );

    if (cart.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(400).json({ error: "Carrito vacío" });
    }

    // 2) Calcular total
    let total = 0;
    cart.rows.forEach(item => {
      total += item.precio * item.cantidad;
    });

    // 3) Insertar pedido
    const pedido = await client.query(
      `INSERT INTO pedidos (user_id, monto_total, estado)
       VALUES ($1, $2, 'pagado')
       RETURNING id`,
      [userId, total]
    );

    const pedidoId = pedido.rows[0].id;

    // 4) Insertar items del pedido
    const insertItems = cart.rows.map(item =>
      client.query(
        `INSERT INTO pedidos_items (id_pedido, id_producto, cantidad, precio)
         VALUES ($1, $2, $3, $4)`,
        [pedidoId, item.id_producto, item.cantidad, item.precio]
      )
    );

    await Promise.all(insertItems);

    // 5) Vaciar carrito del usuario
    await client.query(
      `DELETE FROM carrito_item WHERE id_user = $1`,
      [userId]
    );

    await client.query("COMMIT");

    res.json({
      ok: true,
      pedidoId,
      total,
      items: cart.rows
    });
  } catch (e) {
    console.error(" ERROR createOrder:", e);
    await client.query("ROLLBACK");
    res.status(500).json({ error: "Error creando pedido" });
  } finally {
    client.release();
  }
}

export async function getOrder(req, res) {
  const { id } = req.params;

  try {
    const pedido = await pool.query(
      `SELECT * FROM pedidos WHERE id = $1`,
      [id]
    );

    if (pedido.rows.length === 0)
      return res.status(404).json({ error: "Pedido no encontrado" });

    const items = await pool.query(
      `SELECT * FROM pedidos_items WHERE id_pedido = $1`,
      [id]
    );

    res.json({
      ...pedido.rows[0],
      items: items.rows
    });
  } catch (e) {
    console.error(" ERROR getOrder:", e);
    res.status(500).json({ error: "Error obteniendo pedido" });
  }
}

// =======================

export async function getOrdersByUser(req, res) {
  const { userId } = req.params;

  try {
    const orders = await pool.query(
      `
      SELECT * FROM pedidos 
      WHERE user_id = $1
      ORDER BY fecha_creacion DESC
      `,
      [userId]
    );

    if (orders.rows.length === 0)
      return res.json([]); 

    // items de cada pedido
    const orderIds = orders.rows.map((o) => o.id);

    const items = await pool.query(
      `
      SELECT pi.*, p.nombre 
      FROM pedidos_items pi
      JOIN productos p ON p.id = pi.id_producto
      WHERE pi.id_pedido = ANY($1)
      `,
      [orderIds]
    );

    // Mezclar pedidos con sus items
    const result = orders.rows.map((order) => {
      return {
        ...order,
        items: items.rows.filter((i) => i.id_pedido === order.id),
      };
    });

    res.json(result);
  } catch (e) {
    console.error("ERROR getOrdersByUser:", e);
    res.status(500).json({ error: "Error al obtener órdenes" });
  }
}

export async function getOrdersByUserId(req, res) {
  const { userId } = req.params;
  const client = await pool.connect();

  try {
    const result = await client.query(
      `SELECT p.id, p.estado, p.monto_total, p.fecha_creacion
       FROM pedidos p
       WHERE p.user_id = $1
       ORDER BY p.fecha_creacion DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (e) {
    console.error("Error al obtener órdenes:", e);
    res.status(500).json({ error: "BD error" });
  } finally {
    client.release();
  }
}

export const getAllOrders = async (req, res) => {
  try {
  //console.log("Entró a getAllOrders");
  //console.log("USER", req.user);

    const result = await pool.query(
      `SELECT o.id, o.monto_total, o.estado, o.fecha_creacion, 
              u.username, u.rol
       FROM pedidos o
       JOIN usuarios u ON u.id = o.user_id
       ORDER BY o.fecha_creacion DESC`
    );


    const items = await pool.query(
      `SELECT oi.*, p.nombre
       FROM pedidos_items oi
       JOIN productos p ON p.id = oi.id_producto`
    );

    const ordersWithItems = result.rows.map(order => ({
      ...order,
      items: items.rows.filter(i => i.id_pedido === order.id)
    }));

    res.json(ordersWithItems);
  } catch (error) {
    console.error("Error cargando todas las órdenes:", error);
    res.status(500).json({ error: "No se pudieron cargar las órdenes" });
  }
};
