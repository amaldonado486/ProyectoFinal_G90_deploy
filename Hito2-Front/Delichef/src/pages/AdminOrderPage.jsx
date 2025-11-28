import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminOrdersPage({ navigate }) {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

    useEffect(() => {
    if (!user || user.rol !== "admin") {
      //console.log("USER22:", user);

    }

    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${API_URL}/api/orders/admin/all`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    //console.log("ORDENES RECIBIDAS:", res.data);
    setOrders(res.data || []);
  };

  const updateStatus = async (id, estado) => {
    await axios.put(`${API_URL}/api/orders/${id}/status`, {
      estado
    });

    fetchOrders();
  };

  return (
    <main className="container py-5">
      <h2 className="fw-bold mb-4">Órdenes de Todos los Usuarios</h2>

      <button
        className="btn btn-secondary mb-4"
        onClick={() => navigate("/profile")}
      >
        ⬅ Volver al Perfil
      </button>

      <div className="accordion" id="ordersAccordion">
        {orders.map((o, i) => (
          <div className="accordion-item" key={o.id}>
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                data-bs-toggle="collapse"
                data-bs-target={`#o${i}`}
              >
                Pedido #{o.id} — {o.username} — ${o.monto_total}
              </button>
            </h2>

            <div
              id={`o${i}`}
              className="accordion-collapse collapse"
              data-bs-parent="#ordersAccordion"
            >
              <div className="accordion-body">
                <p>Fecha: {o.fecha_creacion}</p>
                <p>Estado: {o.estado}</p>

                <ul>
                  {o.items.map(item => (
                    <li key={item.id}>
                      {item.nombre} — {item.cantidad}u — ${item.precio}
                    </li>
                  ))}
                </ul>

                <select
                  defaultValue={o.estado}
                  className="form-select mt-3"
                  onChange={(e) =>
                    updateStatus(o.id, e.target.value)
                  }
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="pagado">Pagado</option>
                  <option value="enviada">Enviada</option>
                  <option value="completada">Completada</option>
                  <option value="cancelada">Cancelada</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
