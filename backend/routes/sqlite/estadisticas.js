const express = require('express');
const router = express.Router();
const controller = require('../../controllers/sqlite/estadisticasController');

router.get('/', controller.getAll);

module.exports = router;
