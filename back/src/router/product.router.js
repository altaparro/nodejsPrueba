const productoRouter = require("express").Router()
const { faker } = require("@faker-js/faker")
const Products = require("../model/product.model");
const productosController = require("../controllers/productos.controller")
const { request } = require("express");
const app = require("../app/app");

const verificarToken = require("../middleware/authMiddleware").verificarToken;

productoRouter.get("/products", verificarToken, productosController.obtenerTodosLosProductos);

productoRouter.get("/products/:product_id", verificarToken, productosController.obtenerProductoPorID);

productoRouter.post("/products", verificarToken, productosController.crearProducto);
 
productoRouter.put("/products/:product_id", verificarToken, productosController.actualizarProducto);

productoRouter.delete("/products/:product_id", verificarToken, productosController.eliminarProducto)

module.exports = productoRouter;