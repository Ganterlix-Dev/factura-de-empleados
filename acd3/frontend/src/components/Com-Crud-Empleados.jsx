import { Link } from 'react-router-dom';
import Logo from '../imgs/Logo.jpg';
import MostrarEmpleado from './Com-Mostrar-Empleados';
import React, { useState } from 'react';


export default function CrudEmpleados() { 
    const [empleados, setEmpleados] = useState([]); // Estado para lista de empleados
    const [mensaje, setMensaje] = useState(null); // Estado para mensajes informativos
    
    // Función para actualizar todos los empleados (Mostrar)
    const obtenerEmpleados = async () => {
      setMensaje(null); // Limpiar cualquier mensaje previo
      try {
        const response = await fetch("http://localhost:3001/Crud"); // Ruta para obtener todos los empleados
        const result = await response.json();
  
        if (response.ok) {
          setEmpleados(result); // Actualizar la lista de empleados
          setMensaje("Lista actualizada."); // Mensaje de éxito
        } else {
          setMensaje(result.message || "Error al obtener empleados."); // Mensaje de error
        }
      } catch (error) {
        console.error("Error al obtener empleados:", error);
        setMensaje("Error al obtener empleados."); // Mostrar mensaje de error en caso de fallo
      }
    };
  
  return (
    <div className="min-h-screen bg-gray-800 p-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center bg-white rounded-lg border border-gray-200 ">
          <div className="mr-4">
            <div className="h-10 w-10 p-1"><img src={Logo}/></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Lista De Empleados</h1>
        </div>

        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-md">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <Link to='/Crear'>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Crear
                </button>
              </Link>
              
              <Link to='/Editar'>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Editar
                </button>
              </Link>
              
              <button
                type="button"
                onClick={obtenerEmpleados} 
                className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                Mostrar
              </button>

              <Link to='/Eliminar'>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Eliminar
                </button>
              </Link>

              <Link to='/Sumatoria'>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-stone-600 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                    />
                  </svg>
                  Sumatoria
                </button>
              </Link>
            </div>
            <div className="relative mt-4 w-full md:mt-0 md:w-64">
            </div>
          </div>
        </div>
      <MostrarEmpleado empleados={empleados} mensaje={mensaje} />
      </div>
    </div>
  )
}

