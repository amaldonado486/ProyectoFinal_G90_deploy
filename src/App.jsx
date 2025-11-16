import React from 'react';
import { CartProvider } from "./context/CartProvider";
import { AuthProvider } from './context/AuthProvider';
import AppContent from "./AppContent";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
