const usuarioRouter = require("express").Router()
const { faker } = require("@faker-js/faker")
const Usuarios = require("../model/usuario.model");
const usuariosController = require('../controllers/usuario.controllers'); 
const { request } = require("express");
const verificarToken = require("../middleware/authMiddleware").verificarToken;



usuarioRouter.get("/usuarios", verificarToken, usuariosController.obtenerTodosLosUsuarios);

usuarioRouter.get("/usuarios/:usuario_id", usuariosController.obtenerUsuarioPorID);

usuarioRouter.post("/usuarios", usuariosController.crearUsuario);

usuarioRouter.post("/usuarios", usuariosController.actualizarUsuario);

// router2.patch    faltaria hacer un patch

usuarioRouter.post("/usuarios", usuariosController.eliminarUsuario);

module.exports = usuarioRouter;