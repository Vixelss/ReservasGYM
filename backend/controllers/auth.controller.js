const db = require("../models");
const Usuario = db.Usuario;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Importar modelo Log
const Log = require("../models/sqlite/Log");

const login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email: correo } });
    if (!usuario) return res.status(401).json({ mensaje: "Usuario no existe" });

    const coincide = bcrypt.compareSync(password, usuario.password_hash);
    if (!coincide) return res.status(401).json({ mensaje: "Contraseña incorrecta" });

    const rol = await db.Rol.findByPk(usuario.id_role);

    const token = jwt.sign(
      { id: usuario.id_usuario, rol: rol.nombre },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    // ✅ Registrar log de acceso
    await Log.create({
      usuario_email: usuario.email,
      fecha_hora: new Date(),
      ip: req.ip || 'localhost',
      navegador: req.headers['user-agent'] || 'Desconocido'
    });

    res.json({
      token,
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        rol: rol.nombre
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error interno", error });
  }
};

const registro = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const role = await db.Rol.findOne({ where: { nombre: 'cliente' } });
    if (!role) return res.status(400).json({ mensaje: "Rol 'cliente' no existe" });

    const hash = bcrypt.hashSync(password, 10);

    const nuevo = await Usuario.create({
      nombre: name,
      email: email,
      password_hash: hash,
      id_role: role.id_role
    });

    res.status(201).json({ mensaje: "Usuario registrado", id: nuevo.id_usuario });
  } catch (error) {
    res.status(500).json({ mensaje: "Error registrando usuario", error });
  }
};

module.exports = { login, registro };
