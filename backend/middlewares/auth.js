const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ mensaje: "Token no enviado" });

  const token = authHeader.split(" ")[1]; // "Bearer TOKEN"
  if (!token) return res.status(401).json({ mensaje: "Token invalido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // guarda { id, rol }
    next();
  } catch (err) {
    return res.status(403).json({ mensaje: "Token no válido o expirado" });
  }
};

// middleware adicional: requiere un rol específico
exports.verifyRole = (rolEsperado) => {
  return (req, res, next) => {
    if (!req.usuario || req.usuario.rol !== rolEsperado) {
      return res.status(403).json({ mensaje: "Acceso denegado (rol insuficiente)" });
    }
    next();
  };
};
