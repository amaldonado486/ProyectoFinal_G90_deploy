import React from "react";
import { formatPrice } from "../utils/formatPrice";
import { KITS } from "../data/kits";

export default function KitCard({ kit, navigate }) {
  return (
    <div className="card shadow-sm" style={{ width: "18rem" }}>
      <img src={kit.img} className="card-img-top" alt={kit.name} onError={(e) => (e.target.src = "https://placehold.co/400x300?text=No+Image")}/>


      <div className="card-body">
        <h5 className="card-title">{kit.name}</h5>
        <p className="card-text">{formatPrice(kit.price)}</p>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/detalle", kit.id)}
         
        >
          Ver detalle
        </button>
      </div>
    </div>
  );
}
