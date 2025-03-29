import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function PagVisitor() {
  const [formData, setFormData] = useState({
    nombre: "",
    documento: "",
    tipo_pago: "",
    mes: "",
    ano: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Para redirigir al recibo

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, documento, tipo_pago, mes, ano } = formData;

    // Validar que todos los campos estén completos
    if (!nombre || !documento || !tipo_pago || !mes || !ano) {
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Enviar los datos al backend
      const response = await fetch("http://localhost:3001/Visitor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al buscar el ID de salarios.");
      }

      // Redirigir al recibo correspondiente
      console.log("ID de Salarios encontrado:", data.id_salarios); // Verificar el ID
      navigate(`/Recibo/${data.id_salarios}`);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "Ocurrió un error inesperado.");
    }
  };

  const handleCancel = () => {
    setFormData({
      nombre: "",
      documento: "",
      tipo_pago: "",
      mes: "",
      ano: "",
    });
    setErrorMessage("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800 p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Buscar Recibo</h2>
          <p className="text-sm text-gray-600">Ingresa los datos para buscar el recibo</p>
        </div>
  
        {errorMessage && (
          <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}
  
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="mb-1 block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Ingrese el nombre completo"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="documento" className="mb-1 block text-sm font-medium text-gray-700">
              Documento de Identidad
            </label>
            <input
              id="documento"
              name="documento"
              type="text"
              placeholder="Ingrese el documento"
              value={formData.documento}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
  
          <div className="mb-4">
            <label htmlFor="tipo_pago" className="mb-1 block text-sm font-medium text-gray-700">
              Tipo de Pago
            </label>
            <select
              id="tipo_pago"
              name="tipo_pago"
              value={formData.tipo_pago}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="" disabled>
                Seleccione el tipo de pago
              </option>
              <option value="primera">Primera Quincena</option>
              <option value="segunda">Segunda Quincena</option>
              <option value="mensual">Mensual</option>
            </select>
          </div>
  
          <div className="mb-4">
            <label htmlFor="mes" className="mb-1 block text-sm font-medium text-gray-700">
              Mes
            </label>
            <select
              id="mes"
              name="mes"
              value={formData.mes}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="" disabled>
                Seleccione el mes
              </option>
              {[...Array(12)].map((_, index) => (
                <option key={index} value={(index + 1).toString().padStart(2, "0")}>
                  {new Date(0, index).toLocaleString("es-ES", { month: "long" })}
                </option>
              ))}
            </select>
          </div>
  
          <div className="mb-4">
            <label htmlFor="ano" className="mb-1 block text-sm font-medium text-gray-700">
              Año
            </label>
            <input
              type="number"
              id="ano"
              name="ano"
              min="2020"
              max="3000"
              value={formData.ano}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Ejemplo: 2025"
            />
          </div>
  
          <div className="space-y-3  ">
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 gap-4"
            >
              Buscar Recibo
            </button>
            <div>
            <Link to='/'>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
              Cancelar
            </button>
            </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}