const express = require('express');
const mysql = require('mysql2/promise'); // Usamos la versión con promesas
const bcrypt = require('bcrypt'); // Para encriptar contraseñas
const cors = require('cors');
const dotenv = require('dotenv'); // Para manejar variables de entorno

dotenv.config(); // Configuración del archivo .env
const app = express();
app.use(express.json());
app.use(cors());

// Configuración de la conexión a la base de datos
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'database_acd3',
});

// Ruta de registro de usuarios
app.post('/Registrar', async (req, res) => {
    const { usuario, contrasena, rol } = req.body;

    if (!usuario || !contrasena || !rol) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const [existingUser] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(contrasena, 10);
        await db.query(
            'INSERT INTO usuarios (usuario, password, rol) VALUES (?, ?, ?)',
            [usuario, hashedPassword, rol]
        );

        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});

// Ruta de inicio de sesión
app.post('/login', async (req, res) => {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const user = rows[0];
        const isValidPassword = await bcrypt.compare(contrasena, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', rol: user.rol });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
});

// Ruta para crear un empleado
app.post('/Crear', async (req, res) => {
    const { nombre, apellido, documento, telefono, cargo, sueldo } = req.body;

    if (!nombre || !apellido || !documento || !cargo || !sueldo) {
        return res.status(400).json({ message: "Todos los campos obligatorios deben estar completos" });
    }

    try {
        const result = await db.query(
            'INSERT INTO empleados (nombre, apellido, documento, telefono, cargo, sueldo) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, apellido, documento, telefono, cargo, sueldo]
        );
        res.status(201).json({ message: "Empleado creado con éxito", empleadoId: result[0].insertId });
    } catch (error) {
        console.error("Error al crear el empleado:", error);
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(409).json({ message: "El documento ya está registrado" });
        } else {
            res.status(500).json({ message: "Error del servidor" });
        }
    }
});

// Ruta para obtener empleados o realizar búsquedas
app.get('/Crud', async (req, res) => {
    try {
        let query = 'SELECT id, nombre, apellido, documento, telefono, cargo, sueldo FROM empleados';
        let params = [];

        const [rows] = await db.query(query, params);
        res.status(200).json(rows); // Responder con la lista de empleados encontrados
    } catch (error) {
        console.error("Error al obtener empleados:", error);
        res.status(500).json({ message: "Error del servidor." });
    }
});

// Ruta para obtener un empleado por su ID
app.get('/Editar/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await db.query('SELECT * FROM empleados WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error al obtener el empleado:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
});

// Ruta para editar un empleado por su ID
app.put('/Editar/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, documento, telefono, cargo, sueldo } = req.body;

    try {
        const query = `
            UPDATE empleados SET 
              nombre = COALESCE(?, nombre),
              apellido = COALESCE(?, apellido),
              documento = COALESCE(?, documento),
              telefono = COALESCE(?, telefono),
              cargo = COALESCE(?, cargo),
              sueldo = COALESCE(?, sueldo)
            WHERE id = ?
        `;

        const result = await db.query(query, [nombre, apellido, documento, telefono, cargo, sueldo, id]);
        if (result[0].affectedRows === 0) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        res.status(200).json({ message: "Empleado actualizado con éxito" });
    } catch (error) {
        console.error("Error al actualizar el empleado:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
});

app.get('/Buscar/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await db.query('SELECT * FROM empleados WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error al obtener el empleado:", error);
        res.status(500).json({ message: "Error del servidor" });
    }
});


// Ruta para eliminar un empleado por su ID
app.delete('/Eliminar/:id', async (req, res) => {
    console.log("pito");
    
    const { id } = req.params;
    try {
        const result = await db.query(`DELETE FROM empleados WHERE id = ${id}`);
        if (result.affectedRows === 0) { 
            return res.status(404).json({ message: "Empleado no encontrado." });
        }

        res.status(200).json({ message: "Empleado eliminado con éxito." });
    } catch (error) {
        console.error("Error al eliminar el empleado:", error);
        res.status(500).json({ message: "Error del servidor." });
    }
});


app.post('/Sumatoria', async (req, res) => {
    const { tipoPago, mes, ano, documento, sueldoBase, bonos, deducciones, iva } = req.body;

    // Validar que no falten campos obligatorios
    if (!tipoPago || !mes || !ano || !documento || !sueldoBase || !bonos || !deducciones || !iva) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    try {
        // Verificar si el valor ya existe en la tabla salarios
        const queryVerificar = `
            SELECT * FROM salarios WHERE documento = ? AND mes = ? AND ano = ?
        `;
        const [exists] = await db.query(queryVerificar, [documento, mes, ano]);

        if (exists.length > 0) {
            return res.status(409).json({ message: "El registro ya existe en la base de datos." });
        }

        // Inserción en la tabla salarios
        const querySalarios = `
            INSERT INTO salarios (tipo_pago, mes, ano, documento, sueldo_base, bonos, deducciones, iva) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await db.query(querySalarios, [tipoPago, mes, ano, documento, sueldoBase, bonos, deducciones, iva]);

        // Esperar un segundo y luego insertar el recibo en otra tabla
        setTimeout(async () => {
            const queryRecibos = `
                INSERT INTO recibos_generados (empleado_id, sueldo_base, bonos, deducciones, iva) 
                VALUES ((SELECT id FROM empleados WHERE documento = ?), ?, ?, ?, ?)
            `;
            const total = sueldoBase + bonos - deducciones; // Cálculo del total del recibo
            await db.query(queryRecibos, [documento, sueldoBase, bonos, deducciones, iva]);
        }, 1000); // 1000 milisegundos = 1 segundo

        // Redirigir al recibo después de registrar los datos
        res.status(201).json({ message: "Datos registrados con éxito. Redirigiendo al recibo..." });
    } catch (error) {
        console.error("Error al registrar la sumatoria:", error);
        res.status(500).json({ message: "Error del servidor." });
    }
});

app.post('/Visitor', async (req, res) => {
    const { tipo_pago, mes, ano, documento } = req.body;
    console.log('Procesando solicitud');

    // Validación básica
    if (!tipo_pago || !mes || !ano || !documento) {
        return res.status(400).json({ message: 'Por favor, completa todos los campos requeridos.' });
    }

    try {
        console.log("Valores recibidos:", { tipo_pago, mes, ano, documento });

        const query = `
            SELECT id
            FROM salarios
            WHERE tipo_pago = ? AND mes = ? AND ano = ? AND documento = ?;
        `;

        const [rows] = await db.query(query, [tipo_pago, mes, ano, documento]);
        const id_salarios = rows[0]?.id;

        if (!id_salarios) {
            console.log("No se encontraron resultados. Redirigiendo.");
            return res.redirect('/Recibo/1');
        }

        console.log("ID obtenido:", id_salarios);
        // res.redirect(`/Recibo/${id_salarios}`);
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ message: 'Error del servidor. Inténtalo más tarde.' });
    }
});

app.get('/Recibo/:id', async (req, res) => {
    const { id } = req.params; // Captura el id desde la URL

    try {
        const query = `
           SELECT 
                e.nombre,
                e.apellido,
                e.documento AS documento_identidad,
                e.cargo,
                e.sueldo AS sueldo_empleado,
                s.tipo_pago,
                s.mes,
                s.ano,
                s.sueldo_base,
                s.bonos,
                s.deducciones,
                s.iva
            FROM salarios s
            INNER JOIN empleados e ON s.documento = e.documento
            WHERE s.id = ?;
        `; // Realiza la consulta con INNER JOIN para combinar datos
        const [rows] = await db.query(query, [id]); // Ejecuta la consulta
        
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }

        res.status(200).json(rows[0]); // Devuelve los datos específicos del empleado y salario
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).json({ message: 'Error del servidor.' });
    }
});


// Configuración del servidor
app.listen(3001, () => {
    console.log('Servidor corriendo en http://localhost:3001');
});
