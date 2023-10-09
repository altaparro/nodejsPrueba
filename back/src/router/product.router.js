const productoRouter = require("express").Router()
const { faker } = require("@faker-js/faker")
const Products = require("../model/product.model");
const productosController = require("../controllers/productos.controller")
const { request } = require("express");


productoRouter.get("/products", productosController.obtenerTodosLosProductos);

productoRouter.get("/products/:product_id", productosController.obtenerProductoPorID);

productoRouter.post("/products", productosController.crearProducto);
 
productoRouter.put("/products/:product_id", productosController.actualizarProducto);

productoRouter.patch

productoRouter.delete("/products/:product_id", productosController.eliminarProducto)

module.exports = productoRouter;