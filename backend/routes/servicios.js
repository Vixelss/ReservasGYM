const express = require("express");
const router = express.Router();
const controlador = require("../controllers/servicios.controller");
console.log("controlador:", controlador);
const { verifyToken } = require("../middlewares/auth");

router.get("/", controlador.getServicios);
router.post("/", verifyToken, controlador.crearServicio);
router.put("/:id", verifyToken, controlador.editarServicio);
router.delete("/:id", verifyToken, controlador.eliminarServicio);

module.exports = router;
