// sin tildes ni eñes
const { Horario, Servicio } = require('../models');

class ClasesService {
  async getAll() {
    return Horario.findAll({
      include: { model: Servicio, attributes: ['nombre', 'descripcion'] },
      order: [['fecha', 'ASC'], ['hora_inicio', 'ASC']],
    });
  }

  async create(data)   { return Horario.create(data); }
  async update(id, d)  { const h = await Horario.findByPk(id); if (!h) throw new Error('Clase no encontrada'); return h.update(d); }
  async delete(id)     { const h = await Horario.findByPk(id); if (!h) throw new Error('Clase no encontrada'); await h.destroy(); }
}

module.exports = new ClasesService();
