import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React from 'react';
import './index.css';
import Login from './pages/login';
import Registrar from './pages/Registrar'
import NotFound from './pages/Page404';
import Crud_empleados from './pages/Crud';
import Sumatoria from './pages/Sumatoria'
import ReciboP from './pages/Recibo'
import Visitor from './pages/Visitor'
import Crear_Empleado from './pages/CrearEmpleado';
import Editar_Por_Id from './pages/EditarPorId';
import Eliminar_Por_Id from './pages/Eliminar_Por_Id';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/Registrar" element={<Registrar/>} />
                <Route exact path="/Crud" element={<Crud_empleados/>} />
                <Route exact path="/Crear" element={<Crear_Empleado/>} />
                <Route exact path="/Editar" element={<Editar_Por_Id/>} />
                <Route exact path="/Eliminar" element={<Eliminar_Por_Id/>} />
                <Route exact path="/Visitor" element={<Visitor/>} />
                <Route exact path="/Sumatoria" element={<Sumatoria/>} />
                <Route exact path="/Recibo/:id" element={<ReciboP/>} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </Router>
    );
}

export default App;
