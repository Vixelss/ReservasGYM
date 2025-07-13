const { Horario, Servicio } = require("../models");

exports.getHorarios = async (req, res) => {
  try {
    const horarios = await Horario.findAll({
      include: {
        model: Servicio,
        attributes: ["nombre"]
      },
      order: [["fecha", "ASC"], ["hora_inicio", "ASC"]]
    });

    const datos = horarios.map(h => ({
      id_horario: h.id_horario,
      id_servicio: h.id_servicio, // ✅ se incluye para el formulario de edición
      servicio: h.Servicio?.nombre || "(sin nombre)",
      fecha: h.fecha,
      hora_inicio: h.hora_inicio,
      hora_fin: h.hora_fin,
      cupo_max: h.cupo_max
    }));

    res.json(datos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener horarios" });
  }
};

exports.crearHorario = async (req, res) => {
  try {
    const { id_servicio, fecha, hora_inicio, hora_fin, cupo_max } = req.body;

    if (!id_servicio || !fecha || !hora_inicio || !hora_fin || cupo_max == null) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const nuevo = await Horario.create({
      id_servicio,
      fecha,
      hora_inicio,
      hora_fin,
      cupo_max
    });

    res.status(201).json(nuevo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear horario" });
  }
};

exports.eliminarHorario = async (req, res) => {
  try {
    const { id } = req.params;
    await Horario.destroy({ where: { id_horario: id } });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar horario" });
  }
};

exports.editarHorario = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_servicio, fecha, hora_inicio, hora_fin, cupo_max } = req.body;

    if (!id_servicio || !fecha || !hora_inicio || !hora_fin || cupo_max == null) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const horario = await Horario.findByPk(id);
    if (!horario) return res.status(404).json({ error: "Horario no encontrado" });

    await horario.update({
      id_servicio,  // ✅ aquí ya se actualiza correctamente
      fecha,
      hora_inicio,
      hora_fin,
      cupo_max
    });

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al editar horario" });
  }
};
