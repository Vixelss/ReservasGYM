const db = require("../models");
const Usuario = db.Usuario; // 👈 Esta línea es CLAVE
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { correo, password } = req.body;
  console.log("Body recibido:", req.body);

  try {
    const usuario = await Usuario.findOne({
      where: {
        email: correo // ✅ Coincide con el campo real en la BD
      }
    });

    console.log("Usuario encontrado:", usuario);

    if (!usuario) {
      return res.status(401).json({ mensaje: "Usuario no existe" });
    }

    const coincide = bcrypt.compareSync(password, usuario.password_hash); // ✅ campo correcto
    if (!coincide) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      {
        id: usuario.id_usuario,  // ✅ tu clave primaria real
        rol: usuario.id_role     // ✅ tu foreign key real
      },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );

    res.json({
      token,
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        rol: usuario.id_role
      }
    });
  } catch (error) {
    console.error("Error interno:", error);
    res.status(500).json({ mensaje: "Error interno", error });
  }
};

const registro = async (req, res) => {
  const { nombre, correo, password, rol_id } = req.body;

  try {
    const hash = bcrypt.hashSync(password, 10);

    const nuevo = await Usuario.create({
      nombre,
      email: correo,            // ✅ se llama "email" en la tabla
      password_hash: hash,      // ✅ así se llama la columna
      id_role: rol_id           // ✅ campo real en tu tabla
    });

    res.status(201).json({ mensaje: "Usuario registrado", id: nuevo.id_usuario });
  } catch (error) {
    console.error("Error al registrar:", error);
    res.status(500).json({ mensaje: "Error registrando usuario", error });
  }
};

module.exports = { login, registro };
