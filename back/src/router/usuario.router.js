const usuarioRouter = require("express").Router()
const { faker } = require("@faker-js/faker")
const Usuarios = require("../model/usuario.model");
const usuariosController = require('../controllers/usuario.controllers'); 
const { request } = require("express");
const verificarToken = require("../middleware/authMiddleware").verificarToken;



usuarioRouter.get("/usuarios", verificarToken, usuariosController.obtenerTodosLosUsuarios);

usuarioRouter.get("/usuarios/:usuario_id", verificarToken, usuariosController.obtenerUsuarioPorID);

usuarioRouter.post("/usuarios", verificarToken, usuariosController.crearUsuario);

usuarioRouter.put("/usuarios", verificarToken, usuariosController.actualizarUsuario);

usuarioRouter.delete("/usuarios", verificarToken, usuariosController.eliminarUsuario);

module.exports = usuarioRouter;