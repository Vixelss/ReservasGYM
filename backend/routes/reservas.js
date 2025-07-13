const express = require("express");
const router = express.Router();
const {
  listar,
  crear,
  listarTodas,
  crearDesdeAdmin, // ✅ NUEVO
  editar,
  eliminar
} = require("../controllers/reservas.controller");
const { verifyToken } = require("../middlewares/auth");

// Cliente
router.get("/", verifyToken, listar);
router.post("/", verifyToken, crear);

// Admin
router.get("/admin", verifyToken, listarTodas);
router.post("/admin", verifyToken, crearDesdeAdmin); // ✅ NUEVA RUTA para agregar
router.put("/admin/:id", verifyToken, editar);
router.delete("/admin/:id", verifyToken, eliminar);

module.exports = router;
