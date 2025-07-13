const express = require("express");
const router = express.Router();
const controlador = require("../controllers/usuarios.controller");
const { verifyToken } = require("../middlewares/auth");

router.get("/", verifyToken, controlador.getUsuarios);
router.delete("/:id", verifyToken, controlador.eliminarUsuario);
router.post("/", verifyToken, controlador.crearUsuario);
router.put("/:id", verifyToken, controlador.editarUsuario);


module.exports = router;
