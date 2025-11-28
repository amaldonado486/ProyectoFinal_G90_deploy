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
import CheckoutConfirm from "./pages/CheckoutConfirmado";
import NuevoKitPage from "./pages/NuevoKitPage";
import AdminKitsPage from "./pages/AdminKitsPage";
import EditarKitPage from "./pages/EditKitsPage";
import AdminOrdersPage from "./pages/AdminOrderPage";


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
      case "/checkout":
        return <CheckoutConfirm navigate={navigate} />;  
      case "/admin/kits/new":
        return <NuevoKitPage navigate={navigate} />;   
      case "/admin/kits":
        return <AdminKitsPage navigate={navigate} />;
      case "/admin/kits/edit":
        return <EditarKitPage navigate={navigate} selectedId={selectedId} />;
      case "/admin/orders":
        return <AdminOrdersPage navigate={navigate} />;
  

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
