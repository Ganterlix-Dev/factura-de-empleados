export default function ImpresionPago() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800 p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Impresión de Pago</h2>
          <p className="text-sm text-gray-600">Seleccione el período para generar el recibo de pago</p>
        </div>

        <form>
          <div className="mb-4">
            <label htmlFor="nombre" className="mb-1 block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Ingrese el nombre completo"
              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cedula" className="mb-1 block text-sm font-medium text-gray-700">
              Documento de identidad
            </label>
            <input
              id="cedula"
              name="cedula"
              type="text"
              placeholder="Ingrese el número de cédula"
              className="w-full rounded-md border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="periodo" className="mb-1 block text-sm font-medium text-gray-700">
              Período de Pago
            </label>
            <select
              id="periodo"
              name="periodo"
              defaultValue=""
              className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="" disabled>
                Seleccione un período
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
              defaultValue=""
              className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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

          <div className="mb-6">
            <label htmlFor="año" className="mb-1 block text-sm font-medium text-gray-700">
              Año
            </label>
            <input 
                  type="number"
                  className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                  id="ano" 
                  name="ano" 
                  min="2020" 
                  max="3000" 
                  step="1" 
                  placeholder="Ejemplo: 2025" />
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Generar Recibo
            </button>

            <button
              type="button"
              className="w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

