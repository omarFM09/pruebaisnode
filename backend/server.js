const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
const userController = require('./controllers/userController');
//const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
const PORT = 8080;

// Middleware
//app.use(bodyParser.json());
app.use(cors());
// Conexión a la base de datos
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5433,
});


// Añade la conexión al controlador
app.use((req, res, next) => {
    req.pool = pool;
    next();
});

// 

app.get('/api/prueba', (req, res) => {
    console.log(`Servidor corriendo en http://localhost:asdasdsa`);
    res.send("holaaa");
});

app.get('/api/nuevoo', () => {
    console.log('Servidor escuchando en el puerto 8081 ajsasdasd');
  });
  

app.post('/api/register', userController.register);
app.post('/api/login', userController.login); // Asumiendo que tienes un método de login
//app.get('/api/tasks', authMiddleware, taskController.getTasks); // Usa el middleware aquí

app.listen(PORT, () => {
    console.log(`Servidor corriendooooooooooooooooooooooooooooooooooooooo en http://localhost:${PORT}`);
});

// Configura la conexión a PostgreSQL
