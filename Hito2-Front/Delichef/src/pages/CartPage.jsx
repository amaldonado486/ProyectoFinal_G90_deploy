import React, { useContext } from "react";
import { CartContext } from "../context/CartProvider";
import { KITS } from "../data/kits";
import { formatPrice } from "../utils/formatPrice";
import CartItem from "../components/CartItem";
import { ShoppingCart } from "lucide-react";

const CartPage = ({ navigate }) => {
  const {
    cartItems,
    cartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount,
  } = useContext(CartContext);

  const cartDetails = Object.keys(cartItems)
    .map((kitId) => ({
      kit: KITS.find((k) => k.id === kitId),
      quantity: cartItems[kitId],
    }))
    .filter((item) => item.kit);

  return (
    <main className="container py-5">
      <h2 className="fw-bold mb-4 pb-2 border-bottom">
        Tu Carrito de Compras ({cartCount} {cartCount === 1 ? "ítem" : "ítems"})
      </h2>

      <div className="row g-4">
        {/* Lista del carrito */}
        <section className="col-lg-8">
          <div className="card p-4 shadow">
            {cartDetails.length === 0 ? (
              <div className="text-center py-5">
                <ShoppingCart size={64} className="text-secondary mb-3" />
                <p className="text-muted">Tu carrito está vacío.</p>
                <button
                  onClick={() => navigate("/shop")}
                  className="btn btn-link"
                >
                  Ir a la tienda
                </button>
              </div>
            ) : (
              <div>
                {cartDetails.map((item) => (
                  <CartItem
                    key={item.kit.id}
                    item={item}
                    kit={item.kit}
                    updateQuantity={updateQuantity}
                    removeFromCart={removeFromCart}
                  />
                ))}

                <button onClick={clearCart} className="btn btn-outline-danger mt-3">
                  Vaciar Carrito
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Resumen */}
        {cartDetails.length > 0 && (
          <aside className="col-lg-4">
            <div className="card p-4 shadow">
              <h3 className="fw-bold mb-3">Resumen</h3>

              <div className="d-flex justify-content-between fs-5">
                <span>Subtotal:</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between fs-4 fw-bold text-success">
                <span>Total a Pagar:</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="btn btn-success w-100 mt-4"
              >
                Proceder al Pago
              </button>
            </div>
          </aside>
        )}
      </div>
    </main>
  );
};

export default CartPage;
