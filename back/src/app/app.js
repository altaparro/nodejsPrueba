const express = require('express')

const morgan = require("morgan")

const productoRouter = require("../router/product.router")

const usuarioRouter = require("../router/usuario.router")

const app = express()

app.use(morgan("dev"))

app.get('/', (req, res) =>{
    res.send('mi app');
})

app.use(express.json())

app.use("/api/v1", productoRouter)
app.use("/api/v1", usuarioRouter)

module.exports = app;