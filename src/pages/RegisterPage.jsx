import React from "react";

export default function RegisterPage({ navigate }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registro enviado ✅");
    navigate("/login");
  };

  return (
    <main className="container py-5">
      <h2>Crear cuenta</h2>

      <form onSubmit={handleSubmit} className="mt-4" style={{ maxWidth: "420px" }}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" required />
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
