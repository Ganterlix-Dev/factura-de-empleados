import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";

export default function FormularioLogin() {
  const [formData, setFormData] = useState({ usuario: "", contrasena: "" });
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);

    if (!formData.usuario || !formData.contrasena) {
      setMensaje("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setMensaje(result.message);

      if (response.ok) {
        console.log("Inicio de sesión exitoso:", result.rol);
        localStorage.setItem("rol", result.rol);

        setTimeout(() => {
          if (result.rol === "admin") {
            navigate("/Crud");
          } else if (result.rol === "usuario") {
            navigate("/Visitor");
          }
        }, 1000);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setMensaje("Ocurrió un error al intentar iniciar sesión.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-gray-100 p-6 shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Iniciar sesión</h2>
          <p className="text-sm text-gray-600">Ingresa tus credenciales para acceder al sistema</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="usuario" className="mb-1 block text-sm font-medium text-gray-700">
              Nombre de usuario
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <input
                id="usuario"
                name="usuario"
                type="text"
                value={formData.usuario}
                onChange={handleChange}
                placeholder="usuario123"
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="contrasena" className="mb-1 block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                id="contrasena"
                name="contrasena"
                type="password"
                value={formData.contrasena}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Iniciar sesión
          </button>

          <div className="mt-6 text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link to='/Registrar' className="font-medium text-blue-600 hover:text-blue-800">
              Regístrate aquí
            </Link>
          </div>
        </form>
        {mensaje && (
          <div className="mt-4 rounded-lg border p-2 text-center text-sm text-gray-800">
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
}
