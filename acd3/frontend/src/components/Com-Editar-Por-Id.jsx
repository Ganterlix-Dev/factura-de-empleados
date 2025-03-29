import React, { useState } from "react";
import { Link } from "react-router-dom";


export default function EditarPorId() {
  const [id, setId] = useState(""); 
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    documento: "",
    telefono: "",
    cargo: "",
    sueldo: "",
  });
  const [mensaje, setMensaje] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setMensaje(null);

    try {
      const response = await fetch(`http://localhost:3001/Editar/${id}`);
      const result = await response.json();

      if (response.ok) {
        setFormData(result); 
        setMensaje("Empleado encontrado.");
      } else {
        setMensaje(result.message || "Empleado no encontrado.");
      }
    } catch (error) {
      console.error("Error al buscar el empleado:", error);
      setMensaje("Error al buscar el empleado.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMensaje(null);

    try {
      const response = await fetch(`http://localhost:3001/Editar/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMensaje("Empleado actualizado con éxito.");
      } else {
        setMensaje(result.message || "Error al actualizar el empleado.");
      }
    } catch (error) {
      console.error("Error al actualizar el empleado:", error);
      setMensaje("Error al actualizar el empleado.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 p-4">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-100">Buscar Empleado para Editar</h1>
          <p className="text-sm text-gray-400">Ingrese el ID del empleado que desea editar</p>
        </div>

        <div className="mb-2 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
          <form className="flex items-end gap-4" onSubmit={handleSearch}>
            <div className="flex-1">
              <label htmlFor="buscar-id" className="mb-1 block text-sm font-medium text-gray-700">
                ID del Empleado
              </label>
              <input
                id="buscar-id"
                name="id"
                type="text"
                placeholder="Ingrese el ID del empleado"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Buscar
            </button>
          </form>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-md">
          <form onSubmit={handleUpdate}>
            <div className="grid gap-6 md:grid-cols-2">
              {["nombre", "apellido", "documento", "telefono", "cargo", "sueldo"].map((campo) => (
                <div key={campo}>
                  <label htmlFor={campo} className="mb-1 block text-sm font-medium text-gray-700">
                    {campo.charAt(0).toUpperCase() + campo.slice(1)}
                  </label>
                  <input
                    id={campo}
                    name={campo}
                    type={campo === "sueldo" ? "number" : "text"}
                    value={formData[campo]}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>

          {mensaje && <p className=" p-5 text-center text-sm text-gray-600">{mensaje}</p>}
            <div className="mt-2 flex justify-end space-x-4">
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
                className="rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                Actualizar Empleado
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
