import { Link } from "react-router-dom";
import React, { useState } from "react";

export default function FormularioSumatoria() {
  const [formData, setFormData] = useState({
    tipoPago: "",
    mes: "",
    ano: "",
    documento: "", // Nuevo campo para documento
    sueldoBase: "",
    bonos: "",
    deducciones: "",
    iva: "",
  });
  const [mensaje, setMensaje] = useState(null); // Estado para manejar mensajes de éxito o error

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recarga de la página
    setMensaje(null); // Limpiar mensajes previos

    try {
      const response = await fetch("http://localhost:3001/Sumatoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Enviar datos del formulario al backend
      });

      const result = await response.json();
      if (response.ok) {
        setMensaje("Datos registrados con éxito."); // Mensaje de éxito
        setFormData({ // Limpiar el formulario
          tipoPago: "",
          mes: "",
          ano: "",
          documento: "",
          sueldoBase: "",
          bonos: "",
          deducciones: "",
          iva: "",
        });
      } else {
        setMensaje(result.message || "Error al registrar los datos.");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setMensaje("Error del servidor.");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800 p-4">
      <div className="w-full max-w-4xl rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Sumatoria</h2>
        </div>
  
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label htmlFor="tipoPago" className="mb-1 block text-sm font-medium text-gray-700">
                  Tipo de Pago
                </label>
                <div className="relative">
                  <select
                    id="tipoPago"
                    name="tipoPago"
                    value={formData.tipoPago}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      Seleccione tipo de pago
                    </option>
                    <option value="primera">Primera Quincena</option>
                    <option value="segunda">Segunda Quincena</option>
                    <option value="mensual">Mensual</option>
                  </select>
                </div>
              </div>
  
              <div>
                <label htmlFor="mes" className="mb-1 block text-sm font-medium text-gray-700">
                  Mes
                </label>
                <div className="relative">
                  <select
                    id="mes"
                    name="mes"
                    value={formData.mes}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      Seleccione un mes
                    </option>
                    <option value="01">Enero</option>
                    <option value="02">Febrero</option>
                    <option value="03">Marzo</option>
                    <option value="04">Abril</option>
                    <option value="05">Mayo</option>
                    <option value="06">Junio</option>
                    <option value="07">Julio</option>
                    <option value="08">Agosto</option>
                    <option value="09">Septiembre</option>
                    <option value="10">Octubre</option>
                    <option value="11">Noviembre</option>
                    <option value="12">Diciembre</option>
                  </select>
                </div>
              </div>
  
              <div>
                <label htmlFor="ano" className="mb-1 block text-sm font-medium text-gray-700">
                  Año
                </label>
                <input
                  type="number"
                  id="ano"
                  name="ano"
                  value={formData.ano}
                  onChange={handleChange}
                  min="2020"
                  max="3000"
                  placeholder="Ejemplo: 2025"
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
              <label
                htmlFor="documento"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Documento del empleado
              </label>
              <input
                type="text"
                id="documento"
                name="documento"
                value={formData.documento}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Ingrese el documento del empleado"
              />
              </div>

            </div>
  
            <div className="space-y-4">
              <div>
                <label htmlFor="sueldoBase" className="mb-1 block text-sm font-medium text-gray-700">
                  Sueldo Base
                </label>
                <input
                  id="sueldoBase"
                  name="sueldoBase"
                  type="number"
                  value={formData.sueldoBase}
                  onChange={handleChange}
                  placeholder="Ingrese el Monto"
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
  
              <div>
                <label htmlFor="bonos" className="mb-1 block text-sm font-medium text-gray-700">
                  Bonos
                </label>
                <input
                  id="bonos"
                  name="bonos"
                  type="number"
                  value={formData.bonos}
                  onChange={handleChange}
                  placeholder="Ingrese el Monto"
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
  
              <div>
                <label htmlFor="deducciones" className="mb-1 block text-sm font-medium text-gray-700">
                  Deducciones
                </label>
                <input
                  id="deducciones"
                  name="deducciones"
                  type="number"
                  value={formData.deducciones}
                  onChange={handleChange}
                  placeholder="Ingrese el Monto"
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
  
              <div>
                <label htmlFor="iva" className="mb-1 block text-sm font-medium text-gray-700">
                  Iva
                </label>
                <input
                  id="iva"
                  name="iva"
                  type="number"
                  value={formData.iva}
                  onChange={handleChange}
                  placeholder="Ingrese el Monto"
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
  
          <div className="mt-6">
            <div className="flex justify-center gap-4">
              <Link to="/Crud">
                <button
                  type="button"
                  className="w-32 rounded-md bg-red-600 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Regresar
                </button>
              </Link>
              <button
                type="submit"
                className="w-32 rounded-md bg-green-600 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Registrar
              </button>
            </div>
            <p className="mt-2 text-center text-sm text-gray-700">{mensaje}</p>
          </div>
        </form>
      </div>
    </div>
  );}