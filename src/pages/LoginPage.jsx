import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { LogIn } from "lucide-react";

const LoginPage = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate("/");
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-75 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: 400 }}>
        <h2 className="text-center fw-bold mb-4">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              required
              className="form-control"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Contraseña</label>
            <input
              type="password"
              required
              className="form-control"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn btn-success w-100">
            <LogIn size={18} className="me-2" />
            Ingresar
          </button>
        </form>

        <p className="text-center mt-3">
          ¿No tienes cuenta?          
            <button onClick={() => navigate("/register")} className = "btn btn-link">
            Regístrate
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
