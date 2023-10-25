// IMPORTACIONES

const usuarioRouter = require("express").Router()
const { faker } = require("@faker-js/faker")
const Usuarios = require("../model/usuario.model");
const usuariosController = require('../controllers/usuario.controllers'); 
const { request } = require("express");
const verificarToken = require("../middleware/authMiddleware").verificarToken;
const obtenerPermisos = require('../permisos/permisos');
const { validacionesInputs, validacionLogin } = require('../validaciones/usuariosValidaciones')

const permisoCrear = "crearUsuario"; // aca defino una constante con el nombre del controlador de la ruta, y la envio a permisos.js por parametro
const permisoActualizar = "actualizarUsuario";
const permisoActualizarPorID = "actualizarUsuarioPorID"
const permisoObtenerTodos = "obtenerTodosLosUsuarios";
const permisoObtenerPorID = "obtenerUsuarioPorID";
const permisoEliminar = "eliminarUsuario";


// RUTAS:

usuarioRouter.get("/usuarios/obtenerTodosLosUsuarios", verificarToken, obtenerPermisos(permisoObtenerTodos), usuariosController.obtenerTodosLosUsuarios);

usuarioRouter.get("/usuarios/obtenerUsuarioPorID",  verificarToken, obtenerPermisos(permisoObtenerPorID),usuariosController.obtenerUsuarioPorID);

usuarioRouter.post("/usuarios/crearUsuario", verificarToken, obtenerPermisos(permisoCrear), validacionesInputs, usuariosController.crearUsuario);

usuarioRouter.put("/usuarios/actualizarUsuario", verificarToken, obtenerPermisos(permisoActualizar), usuariosController.actualizarUsuario);

usuarioRouter.put("/usuarios/actualizarUsuarioPorID", verificarToken, obtenerPermisos(permisoActualizarPorID), usuariosController.actualizarUsuarioPorID);

usuarioRouter.delete("/usuarios/eliminarUsuario", verificarToken, obtenerPermisos(permisoEliminar), usuariosController.eliminarUsuario);

usuarioRouter.post("/login", validacionLogin, usuariosController.login);




module.exports = usuarioRouter;