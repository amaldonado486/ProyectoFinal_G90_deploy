import React, { useState } from "react"; 
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import DetailPage from "./pages/DetailPage";
import Footer from "./components/Footer";
import RegisterPage from "./pages/RegisterPage";

export default function AppContent() {
  const [route, setRoute] = useState("/");
  const [selectedId, setSelectedId] = useState(null);

  const navigate = (path, id = null) => {
    setRoute(path);
    setSelectedId(id);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (route) {
      case "/":
        return <HomePage navigate={navigate} />;
      case "/shop":
        return <ShopPage navigate={navigate} />;
      case "/cart":
        return <CartPage navigate={navigate} />;
      case "/login":
        return <LoginPage navigate={navigate} />;
      case "/profile":
        return <ProfilePage navigate={navigate} />;
      case "/register":
        return <RegisterPage navigate={navigate} />;        
      case "/detalle":
        return <DetailPage navigate={navigate} selectedId={selectedId} />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen d-flex flex-column bg-light">
      <Navbar navigate={navigate} />
      <main className="flex-fill">{renderPage()}</main>

      {/* ✅ Footer siempre visible */}
      <Footer />
    </div>
  );
}
