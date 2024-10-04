const express = require('express');
const { register, login } = require('../controllers/userController');
const router = express.Router();

module.exports = (pool) => {
    router.post('/register', (req, res) => register(req, res, pool));
    router.post('/login', (req, res) => login(req, res, pool));
    return router;
};
