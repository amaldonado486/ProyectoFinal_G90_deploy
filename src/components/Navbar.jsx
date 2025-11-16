import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { CartContext } from "../context/CartProvider";
import { formatPrice } from "../utils/formatPrice";


// Icons
import {
  Package,
  Home as HomeIcon,
  User,
  LogOut,
  LogIn,
  ShoppingCart,
} from "lucide-react";

const Navbar = ({ navigate }) => {
  const { user, logout } = useContext(AuthContext);
  const { cartTotal, cartCount } = useContext(CartContext);

  const formattedTotal = formatPrice(cartTotal);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">

        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="navbar-brand d-flex align-items-center gap-2 border-0 bg-transparent">

          <img src="/logo2.png" alt="DeliChef" style={{ height: "60px", objectFit: "contain" }}/>
          
        </button>

        {/* Toggle mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="navMenu" className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto d-flex align-items-center gap-2">

            {/* Tienda */}
            <li className="nav-item">
              <button
                className="btn btn-outline-light d-flex align-items-center gap-1"
                onClick={() => navigate("/shop")}
                //onClick={() => navigate("tienda")}
              >
                <HomeIcon size={16} /> Tienda
              </button>
            </li>

            {user ? (
              <>
                {/* Perfil */}
                <li>
                  <button
                    className="btn btn-success d-flex align-items-center gap-1"
                    onClick={() => navigate("/profile")}
                  >
                    <User size={16} /> Mi Perfil
                  </button>
                </li>

                {/* Logout */}
                <li>
                  <button
                    className="btn btn-danger d-flex align-items-center gap-1"
                    onClick={logout}
                  >
                    <LogOut size={16} /> Salir
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button
                  className="btn btn-warning d-flex align-items-center gap-1"
                  onClick={() => navigate("/login")}
                >
                  <LogIn size={16} /> Iniciar Sesión
                </button>
              </li>
            )}

            {/* Carrito */}
            <li>
              <button
                className="btn btn-primary position-relative d-flex align-items-center gap-1"
                onClick={() => navigate("/cart")}
                //onClick={() => navigate("carrito")}
              >
                <ShoppingCart size={16} />
                Carrito: {formattedTotal}

                {cartCount > 0 && (
                  <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                    {cartCount}
                  </span>
                )}
              </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
