const express = require('express')

const morgan = require("morgan")

const router = require("../router/product.router")

const router2 = require("../router/usuario.router")

const app = express()

app.use(morgan("dev"))

app.get('/', (req, res) =>{
    res.send('mi app');
})

app.use(express.json())

app.use("/api/v1", router)
app.use("/api/v1", router2)

module.exports = app;