const express = require('express');
const router = express.Router();
const controller = require('../../controllers/sqlite/logsController');

// Solo lectura desde admin
router.get('/', controller.getAll);

module.exports = router;
