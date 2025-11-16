import React, { useContext } from "react";
import { formatPrice } from "../utils/formatPrice";
import { KITS } from "../data/kits";
import { CartContext } from "../context/CartProvider";
import Button from 'react-bootstrap/Button';


export default function KitCard({ kit, navigate }) {
  
  const { addToCart } = useContext(CartContext);  
  const handleAdd = () => {
    addToCart(kit.id);

    //navigate("/cart");
  };

  return (
    <div className="card shadow-sm" style={{ width: "18rem" }}>
      <a onClick={() => navigate("/detalle", kit.id)}>
        <img src={kit.img} 
            className="card-img-top" 
            alt={kit.name} 
            onError={(e) => (e.target.src = "https://placehold.co/400x300?text=No+Image")}
            />
      </a>
      <div className="card-body">
        <h5 className="card-title">{kit.name}</h5>
        <p className="card-text">{formatPrice(kit.price)}</p>
        <Button variant="secondary" onClick={() => navigate("/detalle", kit.id)}>Ver más</Button>
        &nbsp;
        <button className="btn btn-success" onClick={handleAdd}>
            Añadir al Carrito
        </button>
      </div>
    </div>
  );
}
