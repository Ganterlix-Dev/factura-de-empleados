import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";

export default function FormularioRegistro() {
  const [formData, setFormData] = useState({ usuario: "", contrasena: "", rol: "" });
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);
    if (!formData.usuario || !formData.contrasena || !formData.rol) {
      setMensaje("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/Registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setMensaje(result.message);

      if (response.ok) {
        setFormData({ usuario: "", contrasena: "", rol: "" });
        setTimeout(() => {{
            navigate("/");
          }
        }, 1000);
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      setMensaje("Ocurrió un error al procesar el registro.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800 p-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Crear cuenta</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="usuario">Usuario:</label>
            <input
              id="usuario"
              name="usuario"
              type="text"
              value={formData.usuario}
              onChange={handleChange}
              placeholder="usuario123"
              className="w-full rounded-md border py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contrasena">Contraseña:</label>
            <input
              id="contrasena"
              name="contrasena"
              type="password"
              value={formData.contrasena}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-md border py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rol">Rol:</label>
            <select
              id="rol"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              className="w-full rounded-md border py-2 px-3"
            >
              <option value="" disabled>Selecciona un rol</option>
              <option value="admin">Administrador</option>
              <option value="usuario">Usuario</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
            Registrarse
          </button>
        </form>
        {mensaje && <p className="mt-4 text-center">{mensaje}</p>}
      </div>
    </div>
  );
}
