const { Usuario, Rol } = require("../models");
const bcrypt = require("bcryptjs");

// 🔒 Simular contraseña visible (ejemplo: invertir los primeros caracteres del hash)
function simularPassword(hash) {
  if (!hash) return "(no definida)";
  return hash.split('').reverse().join('').slice(0, 12) + '...';
}

// ✅ Obtener todos los usuarios (con contraseña simulada y rol)
exports.getUsuarios = async (req, res) => {
  const usuarios = await Usuario.findAll({
    include: { model: Rol, attributes: ["nombre"] },
  });

  const formateado = usuarios.map((u) => ({
    id_usuario: u.id_usuario,
    nombre: u.nombre,
    email: u.email,
    password_simulada: simularPassword(u.password_hash),
    role: u.Rol?.nombre,
  }));

  res.json(formateado);
};

// ✅ Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
  await Usuario.destroy({ where: { id_usuario: req.params.id } });
  res.sendStatus(204);
};

// ✅ Crear usuario con validación y hash de contraseña
exports.crearUsuario = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  if (!nombre || !email || !password || !rol) {
    return res.status(400).json({ error: "Campos incompletos" });
  }

  const existente = await Usuario.findOne({ where: { email } });
  if (existente) {
    return res.status(409).json({ error: "Ya existe un usuario con ese email" });
  }

  const rolEncontrado = await Rol.findOne({ where: { nombre: rol } });
  if (!rolEncontrado) {
    return res.status(404).json({ error: "Rol no válido" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const nuevo = await Usuario.create({
    nombre,
    email,
    password_hash: hashed,
    id_role: rolEncontrado.id_role,
  });

  res.status(201).json({
    id_usuario: nuevo.id_usuario,
    nombre: nuevo.nombre,
    email: nuevo.email,
    role: rol,
  });
};

// ✅ Editar usuario con posibilidad de cambiar la contraseña
exports.editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, password, rol } = req.body;

  const usuario = await Usuario.findByPk(id);
  if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

  const rolEncontrado = await Rol.findOne({ where: { nombre: rol } });
  if (!rolEncontrado) return res.status(400).json({ error: "Rol no válido" });

  const cambios = {
    nombre,
    email,
    id_role: rolEncontrado.id_role,
  };

  // Solo actualizar si se proporcionó nueva contraseña
  if (password && password.trim().length >= 4) {
    cambios.password_hash = await bcrypt.hash(password, 10);
  }

  await usuario.update(cambios);
  res.sendStatus(204);
};
