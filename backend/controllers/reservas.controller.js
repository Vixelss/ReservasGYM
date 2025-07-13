// backend/controllers/reservas.controller.js
const { Reserva, Usuario, Horario, Servicio } = require("../models");

// ---------- cliente ----------
exports.listar = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      where: { id_usuario: req.usuario.id },
      include: [{ model: Horario, include: Servicio }]
    });
    res.json(reservas);
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: "Error al listar" });
  }
};

exports.crear = async (req, res) => {
  const { id_horario } = req.body;
  try {
    const nueva = await Reserva.create({
      id_usuario: req.usuario.id,
      id_horario,
      fecha_reserva: new Date(),
      estado: "pendiente"
    });
    res.status(201).json(nueva);
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: "Error creando reserva" });
  }
};

// ---------- admin ----------
exports.listarTodas = async (_req, res) => {
  try {
    const reservas = await Reserva.findAll({
      include: [
        { model: Usuario,  attributes: ["nombre"] },
        { model: Horario,  include: { model: Servicio, attributes: ["nombre"] } }
      ]
    });

    const data = reservas.map(r => ({
      id_reserva: r.id_reserva,
      usuario:   r.Usuario?.nombre,
      clase:     r.Horario?.Servicio?.nombre,
      fecha:     r.fecha_reserva?.toISOString().split("T")[0],
      estado:    r.estado
    }));
    res.json(data);
  } catch (e) {
    console.error("listarTodas =>", e);
    res.status(500).json({ mensaje: "Error listando reservas" });
  }
};

exports.crearAdmin = async (req, res) => {
  try {
    const nueva = await Reserva.create(req.body);
    res.status(201).json(nueva);
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: "Error creando" });
  }
};

exports.editar = async (req, res) => {
  try {
    await Reserva.update(req.body, { where: { id_reserva: req.params.id }});
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: "Error editando" });
  }
};

exports.eliminar = async (req, res) => {
  try {
    await Reserva.destroy({ where: { id_reserva: req.params.id }});
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: "Error eliminando" });
  }
};

exports.crearDesdeAdmin = async (req, res) => {
  const { id_usuario, id_horario } = req.body;

  try {
    const yaExiste = await Reserva.findOne({ where: { id_usuario, id_horario } });
    if (yaExiste) return res.status(400).json({ mensaje: "Ya existe una reserva para ese usuario y horario" });

    const horario = await Horario.findByPk(id_horario);
    if (!horario || horario.cupo_max <= 0) return res.status(400).json({ mensaje: "No hay cupos disponibles" });

    const nueva = await Reserva.create({
      id_usuario,
      id_horario,
      fecha_reserva: new Date(),
      estado: "pendiente"
    });

    await Horario.decrement("cupo_max", { by: 1, where: { id_horario } });

    res.status(201).json(nueva);
  } catch (err) {
    console.error("Error en crearDesdeAdmin:", err);
    res.status(500).json({ mensaje: "Error creando reserva desde admin" });
  }
};
