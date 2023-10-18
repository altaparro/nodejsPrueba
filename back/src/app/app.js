const express = require("express");

const morgan = require("morgan");

const productoRouter = require("../router/product.router");

const usuarioRouter = require("../router/usuario.router");

const Usuario = require("../model/usuario.model");

const app = express();

const jwt = require("jsonwebtoken");

const keys = require("../settings/keys");

const bcrypt = require("bcrypt");

app.set("key", keys.key);

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("mi app");
});

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/api/v1", productoRouter);

app.use("/api/v1", usuarioRouter);

// aca logueamos, generando un token en el cual incluimos el id para 
// luego al realizar cada consulta pida el id y actualice al usuario correcto

app.post("/login", async (req, res) => {
  const usuariosBase = await Usuario.findAll({
    where: {
      usuario: req.body.usuario,
    },
  });
  console.log(usuariosBase);
  if (!req.body.usuario.trim() || !req.body.password.trim()){
    res.json({
      message: "Complete los campos",
    });
  }else if (usuariosBase.length > 0) {
    const usuarioBase = usuariosBase[0]; // obtener el primer usuario que coincida ya que  findAll devuelve un vector con los usuarios
    if (req.body.usuario === usuarioBase.usuario && req.body.password === usuarioBase.password) {
      const userId = usuarioBase.usuario_id; //obtengo el id del usuario
      console.log("userID:", userId);
      const payload = {
        userId: userId,  // aca incluyo el id en el payload el cual luego se enviara por parametro en la generacion del token
        check: true,
      };
      console.log("payload:", payload);
      const token = jwt.sign(payload, app.get("key"), {
        expiresIn: "30m",
      });
      res.json({
        message: "Autenticación exitosa",
        token: token,
      });
    } else {
      res.json({
        message: "Contraseña incorrecta",
      });
    }
  } else {
    res.json({
      message: "Usuario no encontrado",
    });
  }
  
});

module.exports = app;
