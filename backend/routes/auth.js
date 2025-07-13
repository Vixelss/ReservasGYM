// ✅ routes/auth.js
const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);
router.post('/register', authController.registro); // ← el nombre de la función es "registro"

module.exports = router;
