const express = require('express');
const router = express.Router();
const controller = require('../../controllers/sqlite/opinionesController');

router.get('/', controller.getAll);
router.post('/', controller.create);

module.exports = router;
