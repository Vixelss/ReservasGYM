const Estadistica = require('../../models/sqlite/Estadistica');

exports.getAll = async (req, res) => {
  try {
    const data = await Estadistica.findAll({ order: [['fecha', 'DESC']] });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
};
