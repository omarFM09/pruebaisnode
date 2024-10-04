const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de usuario
exports.register = async (req, res) => {
    const { nombre, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO public.users (nombre, email, password) VALUES ($1, $2, $3) RETURNING *';
    
    try {
        const result = await req.pool.query(query, [nombre, email, hashedPassword]);
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(400).json({ message: 'Error al registrar usuario', error });
    }
};

// Inicio de sesión
exports.login = async (req, res) => {
    const { email, password } = req.body;
    res.status(201).json({ message: 'Usuario registrado exitosamente' });

    const query = 'SELECT * FROM public.users WHERE email = $1';
    const result = await req.pool.query(query, [email]);
    const user = result.rows[0];

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, nombre: user.nombre, email: user.email } }); // Cambiado a 'nombre'
};
