const express = require("express");
const router = express.Router();
const controlador = require("../controllers/horarios.controller");
const { verifyToken } = require("../middlewares/auth");

router.get("/", verifyToken, controlador.getHorarios);
router.post("/", verifyToken, controlador.crearHorario);
router.delete("/:id", verifyToken, controlador.eliminarHorario);
router.put("/:id", verifyToken, controlador.editarHorario);

module.exports = router;
