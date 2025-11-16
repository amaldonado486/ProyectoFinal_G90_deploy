import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { MapPin, CreditCard } from "lucide-react";
import { formatPrice } from "../utils/formatPrice";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("address");
  const [address, setAddress] = useState({
    street: "Av. Mockingbird 123",
    city: "Santiago",
    phone: "912345678",
  });

  if (!user)
    return (
      <p className="text-center py-5">Debes iniciar sesión para ver tu perfil.</p>
    );

  const uid = user.uid || "N/A";

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Guardando datos:", address);
    alert("Datos guardados (mock)");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "address":
        return (
          <form onSubmit={handleSave} className="mt-3">
            <h4>Direcciones y Contacto</h4>

            <div className="alert alert-secondary small">
              Tu ID de Usuario: <strong>{uid}</strong>
            </div>

            <label className="form-label">Teléfono</label>
            <input
              type="text"
              required
              className="form-control mb-3"
              value={address.phone}
              onChange={(e) =>
                setAddress({ ...address, phone: e.target.value })
              }
            />

            <label className="form-label">Calle y Número</label>
            <input
              type="text"
              required
              className="form-control mb-3"
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
            />

            <label className="form-label">Ciudad / Comuna</label>
            <input
              type="text"
              required
              className="form-control mb-3"
              value={address.city}
              onChange={(e) =>
                setAddress({ ...address, city: e.target.value })
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

      case "orders":
        return (
          <div>
            <h4>Órdenes Pendientes</h4>
            <p className="text-muted small">
              Solo mostramos pedidos activos o recién entregados.
            </p>

            <div className="alert alert-warning d-flex justify-content-between">
              <div>
                <strong>Orden #00123:</strong> {formatPrice(45000)}
                <p className="small">En camino – Entrega estimada: Mañana.</p>
              </div>
              <button className="btn btn-sm btn-outline-warning">
                Ver Detalle
              </button>
            </div>

            <div className="alert alert-success d-flex justify-content-between">
              <div>
                <strong>Orden #00122:</strong> {formatPrice(32000)}
                <p className="small">Entregada – Hace 2 días.</p>
              </div>
              <button className="btn btn-sm btn-outline-success">
                Ver Detalle
              </button>
            </div>

            <p className="text-muted small">
              El historial completo está archivado.
            </p>
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
        </ul>

        <div className="mt-4">{renderContent()}</div>
      </div>
    </main>
  );
};

export default ProfilePage;
