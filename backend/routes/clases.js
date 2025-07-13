const r = require('express').Router();
const ctl = require('../controllers/clases.controller');
const auth = require('../middlewares/auth'); // verifica JWT y rol

r.get('/',            ctl.list);
r.post('/', auth.verifyRole('admin'),                ctl.create);
r.put('/:id', auth.verifyRole('admin'),              ctl.update);
r.delete('/:id', auth.verifyRole('admin'),           ctl.remove);

module.exports = r;
