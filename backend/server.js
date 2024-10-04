const express = require('express');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const pool = require('./db');

const corsAnywhere = require('cors-anywhere');

require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/login', async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

   
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token });
    
    //res.status(401).json({ message: 'Credenciales incorrectas' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

corsAnywhere.createServer({
    originWhitelist: [], // Permitir todas las solicitudes
  }).listen(8080, () => {
    console.log('CORS Anywhere server running on port 8080');
  });