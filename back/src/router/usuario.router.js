const usuarioRouter = require("express").Router()
const { faker } = require("@faker-js/faker")
const Usuarios = require("../model/usuario.model");
const usuariosController = require('../controllers/usuario.controllers'); 
const { request } = require("express");

const permisoCrear = "crearUsuario"; // aca defino una constante con el nombre del controlador de la ruta, y la envio a permisos.js por parametro
const permisoActualizar = "actualizarUsuario";
const permisoObtenerTodos = "obtenerTodosLosUsuarios";
const permisoObtenerPorID = "obtenerUsuarioPorID";
const permisoEliminar = "eliminarUsuario";


const verificarToken = require("../middleware/authMiddleware").verificarToken;

const obtenerPermisos = require('../permisos/permisos');

// RUTAS:

usuarioRouter.get("/usuarios", verificarToken, obtenerPermisos(permisoObtenerTodos), usuariosController.obtenerTodosLosUsuarios);

usuarioRouter.get("/usuarios/:usuario_id",  verificarToken, obtenerPermisos(permisoObtenerPorID), usuariosController.obtenerUsuarioPorID);

usuarioRouter.post("/usuarios", verificarToken, obtenerPermisos(permisoCrear), usuariosController.crearUsuario);

usuarioRouter.put("/usuarios", verificarToken, obtenerPermisos(permisoActualizar), usuariosController.actualizarUsuario);

usuarioRouter.delete("/usuarios", verificarToken, obtenerPermisos(permisoEliminar), usuariosController.eliminarUsuario);

module.exports = usuarioRouter;