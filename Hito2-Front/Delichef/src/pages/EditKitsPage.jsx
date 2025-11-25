import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import { uploadImageToCloudinary } from "../utils/subeImagenes";

const API_URL = import.meta.env.VITE_API_URL;

export default function EditarKitPage({ navigate, selectedId }) {
  const { user } = useContext(AuthContext);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagenFile, setImagenFile] = useState(null);
  const [imagenUrl, setImagenUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!user || user.rol !== "admin") {
      navigate("/");
      return;
    }

    const fetchKit = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/kits/${selectedId}`);
        const kit = response.data;

        setNombre(kit.nombre);
        setDescripcion(kit.descripcion);
        setCategoria(kit.categoria);
        setPrecio(kit.precio);
        setImagenUrl(kit.imagen_kit);
      } catch (err) {
        console.error("Error cargando el kit:", err);
        navigate("/admin/kits");
      } finally {
        setLoading(false);
      }
    };

    fetchKit();
  }, [selectedId, user]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const token = localStorage.getItem("token");
      let newImagenUrl = imagenUrl;

      if (imagenFile) {
        newImagenUrl = await uploadImageToCloudinary(imagenFile);
      }

      await axios.put(
        `${API_URL}/api/kits/${selectedId}`,
        {
          nombre,
          descripcion,
          categoria,
          precio: Number(precio),
          imagen_kit: newImagenUrl,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMsg("Kit actualizado exitosamente ✔");
      setTimeout(() => navigate("/admin/kits"), 1500);
    } catch (err) {
      console.error("Error actualizando kit:", err);
      setMsg("Error al actualizar el kit");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando kit...</p>;

  return (
    <main className="container py-5">
      <h2 className="fw-bold mb-4">Editar Kit</h2>

      <div className="card p-4 shadow">
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Nombre *</label>
            <input
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-control"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Categoría</label>
            <input
              className="form-control"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Precio *</label>
            <input
              type="number"
              className="form-control"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Imagen</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) => setImagenFile(e.target.files[0])}
            />
            {imagenUrl && (
              <img
                src={imagenUrl}
                alt="Preview"
                className="mt-2"
                style={{ maxHeight: "150px" }}
              />
            )}
          </div>

          <button disabled={loading} className="btn btn-success w-100">
            {loading ? "Guardando..." : "Actualizar Kit"}
          </button>

          {msg && <p className="alert alert-info text-center mt-3">{msg}</p>}
        </form>
      </div>
    </main>
  );
}
