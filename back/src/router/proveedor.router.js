const proveedorRouter = require("express").Router()
const proveedoresController = require("../controllers/proveedores.controller")
const verificarToken = require("../middleware/authMiddleware").verificarToken;
const app = require("../app/app");
const { request } = require("express");
const { permisosProveedores } = require('../permisos/permisosProveedores');
const validacionesProveedores = require('../validaciones/proveedoresValidaciones');


proveedorRouter.post("/proveedores/crearProveedor", verificarToken, permisosProveedores(),  validacionesProveedores.validacionesProveedores ,proveedoresController.crearProveedor);

proveedorRouter.put("/proveedores/actualizarProveedor", verificarToken, proveedoresController.actualizarProveedor);

proveedorRouter.get("/proveedores/obtenerTodosLosProveedores", verificarToken, proveedoresController.obtenerTodosLosProveedores);
 
proveedorRouter.delete("/proveedores/eliminarProveedor", verificarToken, proveedoresController.eliminarProveedor);


module.exports = proveedorRouter;