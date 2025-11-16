import React, { createContext, useState } from "react";
import { KITS } from "../data/kits";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({}); // { kitId: quantity }

  const cartTotal = Object.entries(cartItems).reduce(
    (total, [kitId, qty]) => {
      const kit = KITS.find((k) => String(k.id) === String(kitId));
      return total + (kit ? kit.price * qty : 0);
    },
    0
  );

  const cartCount = Object.values(cartItems).reduce(
    (acc, q) => acc + q,
    0
  );

  // ✅ FIX
  const addToCart = (id) =>
    setCartItems((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));

  const updateQuantity = (kitId, newQuantity) => {
    if (newQuantity <= 0) removeFromCart(kitId);
    else
      setCartItems((prev) => ({
        ...prev,
        [kitId]: newQuantity,
      }));
  };

  const removeFromCart = (kitId) =>
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[kitId];
      return updated;
    });

  const clearCart = () => setCartItems({});

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        cartCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
