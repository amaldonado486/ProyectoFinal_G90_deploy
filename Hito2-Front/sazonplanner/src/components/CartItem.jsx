import React from "react";
import { Minus, Plus, X } from "lucide-react";
import { formatPrice } from "../utils/formatPrice";

const CartItem = ({ item, kit, updateQuantity, removeFromCart }) => {
  return (
    <div className="d-flex align-items-center border-bottom py-3">
      <img
        src={kit.img}
        alt={kit.name}
        className="rounded me-3"
        style={{ width: "64px", height: "64px", objectFit: "cover" }}
       // onError={(e) =>
       //   (e.target.src =
       //     "https://placehold.co/400x300/e5e7eb/6b7280?text=Kit")
       // }
        onError={(e) => (e.target.src = "https://placehold.co/400x300?text=No+Image")}
      />

      <div className="flex-grow-1">
        <h5 className="mb-1 fw-semibold">{kit.name}</h5>
        <small className="text-muted">{formatPrice(kit.price)} c/u</small>
      </div>

      {/* Quantity */}
      <div className="d-flex align-items-center me-3">
        <button
          className="btn btn-light btn-sm"
          onClick={() => updateQuantity(kit.id, item.quantity - 1)}
        >
          <Minus size={16} />
        </button>

        <span className="mx-2 fw-medium">{item.quantity}</span>

        <button
          className="btn btn-light btn-sm"
          onClick={() => updateQuantity(kit.id, item.quantity + 1)}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Total */}
      <div className="fw-bold w-100 text-end">
        {formatPrice(kit.price * item.quantity)}
      </div>

      <button
        className="btn btn-link text-danger ms-3"
        onClick={() => removeFromCart(kit.id)}
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default CartItem;
