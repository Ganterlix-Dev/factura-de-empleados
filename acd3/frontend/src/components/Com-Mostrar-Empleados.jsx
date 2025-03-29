import React from "react";

export default function MostrarEmpleado({ empleados, mensaje }) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="border-b border-gray-200 px-4 py-3 text-sm font-medium text-gray-500">#</th>
              <th className="border-b border-gray-200 px-4 py-3 text-sm font-medium text-gray-500">Nombre</th>
              <th className="border-b border-gray-200 px-4 py-3 text-sm font-medium text-gray-500">Apellido</th>
              <th className="border-b border-gray-200 px-4 py-3 text-sm font-medium text-gray-500">
                Documento de identidad
              </th>
              <th className="border-b border-gray-200 px-4 py-3 text-sm font-medium text-gray-500">
                Número de teléfono
              </th>
              <th className="border-b border-gray-200 px-4 py-3 text-sm font-medium text-gray-500">Cargo</th>
              <th className="border-b border-gray-200 px-4 py-3 text-sm font-medium text-gray-500">Sueldo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {empleados.length > 0 ? (
              empleados.map((empleado, index) => (
                <tr key={empleado.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{empleado.nombre}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{empleado.apellido}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{empleado.documento}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{empleado.telefono}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{empleado.cargo}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{empleado.sueldo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-4 py-3 text-center text-sm text-gray-500"
                >
                  No hay empleados disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
        <div className="text-sm text-gray-700">{mensaje}</div>
      </div>
    </div>
  );
}
