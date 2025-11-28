import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { MapPin, CreditCard } from "lucide-react";
import { formatPrice } from "../utils/formatPrice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("address");
  const [orders, setOrders] = useState([]);
  const [adminOrders, setAdminOrders] = useState([]);

  //const [address, setAddress] = useState({
  //  direccion: "Av. Mockingbird 123",
  //  ciudad: "Santiago",
  //  fono: "912345678",
  //});

  const [address, setAddress] = useState({
    direccion: "",
    comuna: "",
    fono: "",
  });

  // Cuando el usuario cambia, rellenamos los campos
  useEffect(() => {
    if (!user) return;

    setAddress({
      direccion: user.direccion || "",
      comuna: user.comuna || "",
      fono: user.fono || "",
    });
  }, [user]);

const handleSave = async (e) => {
  e.preventDefault();

  try {
    const API_URL = import.meta.env.VITE_API_URL;

      await axios.put(
        `${API_URL}/api/users/${user.username}`,
        {
          fono: address.fono,
          direccion: address.direccion,
          comuna: address.comuna,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        }
      );

      // Actualizar datos en el contexto Auth
      setUser({
        ...user,
        fono: address.fono,
        direccion: address.direccion,
        comuna: address.comuna,
      });

      alert("Datos actualizados correctamente");

  } catch (error) {
    console.error("Error actualizando usuario:", error);
    alert("Hubo un error al actualizar los datos");
  }
};




  useEffect(() => {
    if (!user) return; 
    
    const fetchOrders = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;

        const response = await axios.get(
          `${API_URL}/api/orders/user/${user.id}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        setOrders(response.data);
      } catch (e) {
        console.error("Error cargando órdenes:", e);
      }
    };

    fetchOrders();
  }, [user]);

  // Carga órdenes admin solo si es admin
  useEffect(() => {
    if (!user || user.rol !== "admin") return;

    const fetchAdminOrders = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;

        const response = await axios.get(
          `${API_URL}/api/orders/admin/all`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );

        setAdminOrders(response.data);
      } catch (e) {
        console.error("Error órdenes admin:", e);
      }
    };

    fetchAdminOrders();
  }, [user]);

  if (!user)
    return (
      <p className="text-center py-5">
        Debes iniciar sesión para ver tu perfil.
      </p>
    );

  const renderContent = () => {
    switch (activeTab) {
      case "address":
        return (
          <form onSubmit={handleSave} className="mt-3">
            <h4>Direcciones y Contacto</h4>

            <div className="alert alert-secondary small">
              Tu ID de Usuario: <strong>{user.username}</strong>
            </div>

            <label className="form-label">Teléfono</label>
            <input
              type="text"
              required
              className="form-control mb-3"
              value={address.fono}
              onChange={(e) =>
                setAddress({ ...address, fono: e.target.value })
              }
            />

            <label className="form-label">Calle y Número</label>
            <input
              type="text"
              required
              className="form-control mb-3"
              value={address.direccion}
              onChange={(e) =>
                setAddress({ ...address, direccion: e.target.value })
              }
            />

            <label className="form-label">Ciudad / Comuna</label>
            <input
              type="text"
              required
              className="form-control mb-3"
              value={address.comuna}
              onChange={(e) =>
                setAddress({ ...address, comuna: e.target.value })
              }
            />

            <button className="btn btn-success w-100 mb-4">
              <MapPin size={18} className="me-2" />
              Guardar Dirección y Contacto
            </button>

            <h4>Método de Pago (Mock)</h4>
            <p className="text-muted small">
              Solo aceptamos Tarjetas de Crédito/Débito.
            </p>

            <button className="btn btn-primary w-100">
              <CreditCard size={18} className="me-2" />
              Agregar Método de Pago
            </button>
          </form>
        );

//     case "orders":
//       return (
//         <div>
//           <h4>Órdenes Pendientes</h4>
//           <p className="text-muted small">
//             Solo mostramos pedidos activos o recién entregados.
//           </p>
//
//           <div className="alert alert-warning d-flex justify-content-between">
//             <div>
//               <strong>Orden #00123:</strong> {formatPrice(45000)}
//               <p className="small">En camino – Entrega estimada: Mañana.</p>
//             </div>
//             <button className="btn btn-sm btn-outline-warning">
//               Ver Detalle
//             </button>
//           </div>
//
//           <div className="alert alert-success d-flex justify-content-between">
//             <div>
//               <strong>Orden #00122:</strong> {formatPrice(32000)}
//               <p className="small">Entregada – Hace 2 días.</p>
//             </div>
//             <button className="btn btn-sm btn-outline-success">
//               Ver Detalle
//             </button>
//           </div>
//
//           <p className="text-muted small">
//             El historial completo está archivado.
//           </p>
//         </div>
//       );

        case "orders":
          return (
            <div>
              <h4>Mis Órdenes</h4>

              {orders.length === 0 && (
                <p className="text-muted">No tienes órdenes registradas.</p>
              )}

            {orders.map((order) => (
              <div key={order.id} className="alert alert-secondary">
                <strong>Pedido #{order.id}</strong>
                <p className="small">
                  Total: {formatPrice(order.monto_total)} <br />
                  Estado: {order.estado} <br />
                  Fecha: {new Date(order.fecha_creacion).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        );

      case "admin":
        return (
          <div>
            <h4>Órdenes de Todos</h4>

            {adminOrders.length === 0 && (
              <p className="text-muted">No hay órdenes registradas.</p>
            )}

            {adminOrders.map((order) => (
              <div key={order.id} className="alert alert-info">
                <strong>Pedido #{order.id}</strong>
                <p className="small">
                  Total: {formatPrice(order.monto_total)} <br />
                  Cliente: {order.username}
                </p>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="container py-5">
      <h2 className="fw-bold mb-4">Mi Perfil</h2>

      <div className="card p-4 shadow">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "address" ? "active" : ""
              }`}
              onClick={() => setActiveTab("address")}
            >
              Direcciones y Pago
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${
                activeTab === "orders" ? "active" : ""
              }`}
              onClick={() => setActiveTab("orders")}
            >
              Mis Órdenes
            </button>
          </li>

          {user?.rol === "admin" && (
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "admin" ? "active" : ""}`}
                onClick={() => setActiveTab("admin")}
              >
                Órdenes de Todos
              </button>
            </li>
          )}

        </ul>

        <div className="mt-4">{renderContent()}</div>
      </div>
    </main>
  );
};

export default ProfilePage;
