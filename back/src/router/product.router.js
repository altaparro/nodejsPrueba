const productoRouter = require("express").Router()
const Products = require("../model/product.model");
const productosController = require("../controllers/productos.controller");
const verificarToken = require("../middleware/authMiddleware").verificarToken;
const permisos = require('../permisos/permisos');
const { validacionesProductos } = require('../validaciones/productosValidaciones')

const permisoCrear = "crearProducto"; // aca defino una constante con el nombre del controlador de la ruta, y la envio a permisos.js por parametro
const permisoActualizar = "actualizarProducto";
const permisoObtenerTodos = "obtenerTodosLosProductos";
const permisoObtenerPorID = "obtenerProductoPorID";
const permisoEliminar = "eliminarProducto";


productoRouter.get("/products/obtenerTodosLosProductos", verificarToken, permisos.obtenerPermisos(permisoObtenerTodos), productosController.obtenerTodosLosProductos);

productoRouter.get("/products/obtenerProductoPorID", verificarToken, permisos.obtenerPermisos(permisoObtenerPorID), productosController.obtenerProductoPorID);

productoRouter.post("/products/crearProducto", verificarToken, permisos.obtenerPermisos(permisoCrear), validacionesProductos, productosController.crearProducto);
 
productoRouter.put("/products/actualizarProducto", verificarToken, permisos.obtenerPermisos(permisoActualizar), productosController.actualizarProducto);

productoRouter.delete("/products/eliminarProducto", verificarToken, permisos.obtenerPermisos(permisoEliminar), productosController.eliminarProducto)

productoRouter.get("/productos/sarasa", function (req, res){res.status(200).json({message: "asqdaddasdd"})})

module.exports = productoRouter;