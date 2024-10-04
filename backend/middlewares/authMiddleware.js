const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtiene el token del encabezado

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
    }

    try {
        const verified = jwt.verify(token, 'tu_clave_secreta'); // Reemplaza 'tu_clave_secreta' por tu clave real
        req.user = verified; // Guarda los datos del usuario en el request
        next(); // Continúa con la siguiente función de middleware
    } catch (error) {
        return res.status(400).json({ message: 'Token no válido.' });
    }
};

module.exports = authMiddleware;
