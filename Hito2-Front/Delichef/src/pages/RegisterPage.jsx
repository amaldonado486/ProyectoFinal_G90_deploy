import React, { useState } from "react";
import axios from "axios";

export default function RegisterPage({ navigate }) {
  // 1. Estados sincronizados con los nombres de campo de la BD (username, contrasena)
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  // 2. Estados para los campos adicionales requeridos
  const [fono, setFono] = useState(""); 
  const [direccion, setDireccion] = useState("");

  // Usando la variable de entorno de Vite
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 3. Envío de los CINCO campos requeridos por el controlador de backend
      const res = await axios.post(`${API_URL}/api/auth/register`, {
        username,   
        email,
        fono,       
        direccion,  
        contrasena  
      });

      alert("Usuario registrado correctamente");
      navigate("/login");

    } catch (error) {
      console.error(error);
      // Muestra un error más informativo si el backend lo proporciona
      const errorMessage = error.response?.data?.error || "Error al registrar. Revisa la consola del backend.";
      alert(errorMessage);
    }
  };

  return (
    <main className="container py-5">
      <h2>Crear cuenta</h2>

      <form onSubmit={handleSubmit} className="mt-4" style={{ maxWidth: "420px" }}>
        
        {/* Campo USERNAME */}
        <div className="mb-3">
          <label className="form-label">Nombre de Usuario</label>
          <input 
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
        </div>

        {/* Campo EMAIL */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email" 
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        {/* Campo TELÉFONO (FONO) */}
        <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
                type="text" 
                className="form-control"
                value={fono}
                onChange={(e) => setFono(e.target.value)}
            />
        </div>

        {/* Campo DIRECCIÓN */}
        <div className="mb-3">
            <label className="form-label">Dirección</label>
            <input
                type="text" 
                className="form-control"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
            />
        </div>

        {/* Campo CONTRASEÑA */}
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password" 
            className="form-control"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required 
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Registrarse
        </button>

        <button
          type="button"
          className="btn btn-link mt-3"
          onClick={() => navigate("/login")}
        >
          Ya tengo cuenta → Iniciar sesión
        </button>
      </form>
    </main>
  );
}