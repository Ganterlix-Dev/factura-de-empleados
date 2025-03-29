import React, { useState } from "react";
import { Link } from "react-router-dom";


export default function CrearEmpleado() {
  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    documento: "",
    telefono: "",
    cargo: "",
    sueldo: "",
  });

  // Estado para mensajes de éxito o error
  const [mensaje, setMensaje] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);

    try {
      const response = await fetch("http://localhost:3001/Crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMensaje("Empleado creado con éxito.");
        setFormData({
          nombre: "",
          apellido: "",
          documento: "",
          telefono: "",
          cargo: "",
          sueldo: "",
        }); 
      } else {
        setMensaje(result.message || "Error al crear el empleado.");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setMensaje("Ocurrió un error al intentar crear el empleado.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 p-4">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-100">Crear Nuevo Empleado</h1>
          <p className="text-sm text-gray-400">
            Complete el formulario para agregar un nuevo empleado al sistema
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="nombre" className="mb-1 block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Nombre del empleado"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="apellido" className="mb-1 block text-sm font-medium text-gray-700">
                  Apellido
                </label>
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  placeholder="Apellido del empleado"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="documento" className="mb-1 block text-sm font-medium text-gray-700">
                  Documento de identidad
                </label>
                <input
                  id="documento"
                  name="documento"
                  type="text"
                  placeholder="Número de documento"
                  value={formData.documento}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="mb-1 block text-sm font-medium text-gray-700">
                  Número de teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="text"
                  placeholder="Número de teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="cargo" className="mb-1 block text-sm font-medium text-gray-700">
                  Cargo
                </label>
                <input
                  id="cargo"
                  name="cargo"
                  type="text"
                  placeholder="Cargo del empleado"
                  value={formData.cargo}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="sueldo" className="mb-1 block text-sm font-medium text-gray-700">
                  Sueldo
                </label>
                <input
                  id="sueldo"
                  name="sueldo"
                  type="number"
                  placeholder="Sueldo del empleado"
                  value={formData.sueldo}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <Link to='/Crud'>
              <button
                type="button"
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                Regresar
              </button>
              </Link>
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Guardar Empleado
              </button>
            </div>
          </form>
          {mensaje && <p className="mt-4 text-center text-sm text-gray-600">{mensaje}</p>}
        </div>
      </div>
    </div>
  );
}
