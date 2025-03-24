const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'database_acd3',
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos exitosa');
});

app.listen(3001, () => {
    console.log('Servidor corriendo en http://localhost:3001');
});






app.post('/signup', (req, res) => {
    const { username, password, role } = req.body;
    db.query(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        [username, password, role],
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.status(200).send('Usuario registrado');
        }
    );
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password],
        (err, results) => {
            if (err) return res.status(500).send(err);
            if (results.length > 0) {
                res.status(200).send({ message: 'Inicio de sesión exitoso', role: results[0].role });
            } else {
                res.status(401).send('Credenciales incorrectas');
            }
        }
    );
});
