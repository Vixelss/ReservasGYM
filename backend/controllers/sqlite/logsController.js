const Log = require('../../models/sqlite/Log');

exports.getAll = async (req, res) => {
  try {
    const logs = await Log.findAll({ order: [['fecha_hora', 'DESC']] });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener logs de acceso' });
  }
};
