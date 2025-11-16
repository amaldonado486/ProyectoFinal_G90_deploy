import React, { useContext } from "react";
import { KITS } from "../data/kits";
import { formatPrice } from "../utils/formatPrice";
import { CartContext } from "../context/CartProvider";

export default function DetailPage({ navigate, selectedId }) {
  const { addToCart } = useContext(CartContext);

  const kit = KITS.find((k) => String(k.id) === String(selectedId));
  console.log ("KIT DETAIL ->", kit);

  if (!kit) {
    return (
      <main className="container py-5">
        <h2 className="text-danger">Producto no encontrado</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/shop")}>
          Volver
        </button>
      </main>
    );
  }

  const handleAdd = () => {
    addToCart(kit.id);
//    navigate("/cart");
  };



  return (
    <main className="container py-5">
      <button
        className="btn btn-link mb-4"
        onClick={() => navigate("/shop")}
      >
        ← Volver
      </button>

      <div className="row g-4">
        <div className="col-md-6">
          <img
            src={kit.img}
            alt={kit.name}
            className="img-fluid rounded"
            onError={(e) => (e.target.src = "https://placehold.co/600x400?text=Kit")}
          />
        </div>

        <div className="col-md-6">
          <h1>{kit.name}</h1>
          <p className="text-muted">{kit.description}</p>

          <h3 className="fw-bold mb-3">{formatPrice(kit.price)}</h3>

          <button className="btn btn-success" onClick={handleAdd}>
            Añadir al Carrito
          </button>
        </div>
      </div>
    </main>
  );
}
