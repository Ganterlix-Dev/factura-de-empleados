import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Recibo() {
  const { id } = useParams(); // Captura el id desde la URL
  const [recibo, setRecibo] = useState(null);


  useEffect(() => {
    const fetchRecibo = async () => {
      try {
        const response = await fetch(`http://localhost:3001/Recibo/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener el recibo');
        }
        const data = await response.json();
        console.log("Datos recibidos:", data); // Verifica qué datos llegan
        setRecibo(data); // Almacena los datos del recibo
      } catch (error) {
        console.error('Error al obtener el recibo:', error);
      }
    };

    fetchRecibo();
  }, [id]);

  if (!recibo || !recibo.nombre || !recibo.apellido || !recibo.sueldo_base) {
    return <p>Cargando recibo...</p>; // Evita mostrar contenido sin datos
  }

  const total = (
    recibo.bonos - recibo.deducciones - (recibo.sueldo_base * (recibo.iva / 100))
  ).toFixed(2); // Calcula el total dinámicamente

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800 p-4">
      <div className="w-full max-w-2xl rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold">
          {recibo.nombre} {recibo.apellido}
        </h1>

        <div className="mt-6">
          <h2 className="text-xl font-bold border-b-2 border-gray-800 pb-1 mb-3">Datos del Empleado</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-semibold">Nombre:</span> {recibo.nombre} {recibo.apellido}
            </li>
            <li>
              <span className="font-semibold">Cargo:</span> {recibo.cargo || "No disponible"}
            </li>
            <li>
              <span className="font-semibold">Documento de identidad:</span> {recibo.documento_identidad || "No disponible"}
            </li>
            <li>
              <span className="font-semibold">Sueldo actual:</span> {recibo.sueldo_empleado || "No disponible"}
            </li>
          </ul>
        </div>

        <div className="mt-6 space-y-2">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-semibold">Tipo de Pago:</span> {recibo.tipo_pago || "No disponible"}
            </li>
            <li>
              <span className="font-semibold">Mes:</span> {recibo.mes || "No disponible"}
            </li>
            <li>
              <span className="font-semibold">Año:</span> {recibo.ano || "No disponible"}
            </li>
          </ul>
        </div>

        <div className="mt-6">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="py-2">
                  <span className="font-semibold">Sueldo base:</span>
                </td>
                <td className="text-right">{recibo.sueldo_base}</td>
              </tr>
              <tr>
                <td className="py-2">
                  <span className="font-semibold">Bonos:</span>
                </td>
                <td className="text-right">{recibo.bonos}</td>
              </tr>
              <tr>
                <td className="py-2">
                  <span className="font-semibold">Deducciones:</span>
                </td>
                <td className="text-right">{recibo.deducciones}</td>
              </tr>
              <tr>
                <td className="py-2">
                  <span className="font-semibold">IVA:</span>
                </td>
                <td className="text-right">{recibo.iva}%</td>
              </tr>
              <tr className="border-t-2 border-gray-300">
                <td className="py-2 font-bold">Total:</td>
                <td className="text-right font-bold">{total}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-16 space-y-8">
          <div>
            <div className="mb-2 border-t-2 border-gray-300" />
            <p className="font-semibold">Firma del contador</p>
          </div>

          <div>
            <div className="mb-2 border-t-2 border-gray-300" />
            <p className="font-semibold">Firma del Empleado</p>
          </div>
        </div>

        <div className="mt-8 print:hidden">
          <button
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md focus:outline-none"
          >
            Imprimir
          </button>
        </div>
      </div>
    </div>
  );
}