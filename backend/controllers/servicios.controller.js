const { Servicio } = require("../models");



const getServicios = async (req, res) => {
  const servicios = await Servicio.findAll();
  res.json(servicios);
};

const crearServicio = async (req, res) => {
  const nuevo = await Servicio.create(req.body);
  res.status(201).json(nuevo);
};

const editarServicio = async (req, res) => {
  const { id } = req.params;
  await Servicio.update(req.body, { where: { id_servicio: id } });
  res.sendStatus(204);
};

const eliminarServicio = async (req, res) => {
  const { id } = req.params;
  await Servicio.destroy({ where: { id_servicio: id } });
  res.sendStatus(204);
};

// 🔴 ESTE EXPORT ES IMPORTANTE
module.exports = {
  getServicios,
  crearServicio,
  editarServicio,
  eliminarServicio,
};
