const express = require('express')

const morgan = require("morgan")

const productoRouter = require("../router/product.router")

const usuarioRouter = require("../router/usuario.router")

const app = express()

const jwt = require('jsonwebtoken');

const keys = require('../settings/keys')

app.set('key', keys.key)

app.use(morgan("dev"))

app.get('/', (req, res) =>{
    res.send('mi app');
})

app.use(express.urlencoded({extended:false}))

app.use(express.json())

app.use("/api/v1", productoRouter)

app.use("/api/v1", usuarioRouter)

app.post('/login', (req, res)=> {
    if(req.body.usuario == 'admin' && req.body.pass == '12345'){
        const payload = {
            check:true
        };
        const token = jwt.sign(payload, app.get('key'),{
            expiresIn: '7d'
        });
        res.json({
            message: 'autenticacion exitosa',
            token: token
        });
    }else{
        res.json({
            message: 'usuario incorrecto'
        })
    }
});



module.exports = app;