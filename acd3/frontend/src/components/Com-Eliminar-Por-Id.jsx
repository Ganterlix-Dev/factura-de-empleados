import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate  } from "react-router-dom";

export default function EliminarPorId() {
  const [id, setId] = useState(""); // Estado para el ID del empleado
  const [empleado, setEmpleado] = useState(null); // Estado para los datos del empleado
  const [mensaje, setMensaje] = useState(null); // Mensajes informativos
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false); // Estado para mostrar la confirmación
  const navigate = useNavigate();

  // Buscar empleado por ID
  const handleSearch = async (e) => {
    e.preventDefault();
    setMensaje(null);
    setMostrarConfirmacion(false);

    try {
      const response = await fetch(`http://localhost:3001/Buscar/${id}`);
      const result = await response.json();

      if (response.ok) {
        setEmpleado(result); // Guardar datos del empleado
        setMensaje("Empleado encontrado.");
      } else {
        setEmpleado(null);
        setMensaje(result.message || "Empleado no encontrado.");
      }
    } catch (error) {
      console.error("Error al buscar el empleado:", error);
      setMensaje("Error al buscar el empleado.");
    }
  };

  // Eliminar empleado por ID
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/Eliminar/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (response.ok) {
        setMensaje("Empleado eliminado con éxito.");
        setEmpleado(null); // Limpiar los datos del empleado
        setMostrarConfirmacion(false); // Cerrar el modal de confirmación
        setId(""); 
        setTimeout(() => {{
          navigate("/Crud");
        }
      }, 1000);
      } else {
        setMensaje(result.message || "Error al eliminar el empleado.");
      }
    } catch (error) {
      console.error("Error al eliminar el empleado:", error);
      setMensaje("Error al eliminar el empleado.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 p-4">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-100">Buscar Empleado para Eliminar</h1>
          <p className="text-sm text-gray-400">Ingrese el ID del empleado que desea eliminar</p>
        </div>

        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
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

        {mensaje && <p className="mb-4 text-center text-sm text-gray-100">{mensaje}</p>}

        {empleado && (
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-medium text-gray-800">Datos del empleado</h2>

            <div className="grid gap-4 md:grid-cols-2">
              {["nombre", "apellido", "documento", "telefono", "cargo", "sueldo"].map((campo) => (
                <div key={campo}>
                  <p className="text-sm font-medium text-gray-500">{campo.charAt(0).toUpperCase() + campo.slice(1)}</p>
                  <p className="text-gray-800">{empleado[campo]}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setMostrarConfirmacion(true)}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Eliminar Empleado
              </button>
            </div>
          </div>
        )}

        {mostrarConfirmacion && (
          <div className="mt-4 bg-red-50 p-4 border border-red-200 rounded-md">
            <p className="mb-4 text-sm text-red-700">¿Estás seguro de que deseas eliminar este empleado?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setMostrarConfirmacion(false)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                No
              </button>
              <button
                onClick={handleDelete}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
