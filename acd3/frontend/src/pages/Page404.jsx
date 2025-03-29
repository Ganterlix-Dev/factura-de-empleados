import React from 'react';
import error from '../imgs/error.jpg'

const NotFound = () => {
  return (
    <>
    <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4'>
      <div className="w-full max-w-md text-center border border-gray-200 bg-white p-8 shadow-lg items-center">
            <h2 className="text-2xl font-bold text-gray-800">ERROR 404</h2>
            <p className="text-sm text-gray-600">No se a encontrado la pagina</p>
            <div className='flex items-center justify-center'>
              <img src={error}/>
            </div>
      </div>
    </div>
    </>
  );
}

export default NotFound;