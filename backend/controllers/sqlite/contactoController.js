const Contacto = require('../../models/sqlite/Contacto');

exports.getAll = async (req, res) => {
  try {
    const mensajes = await Contacto.findAll();
    res.json(mensajes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener mensajes de contacto' });
  }
};

exports.create = async (req, res) => {
  try {
    const nuevo = await Contacto.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar mensaje' });
  }
};
