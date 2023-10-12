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

//falta pegar en la base y traer usuario y contraseña del mismo.

app.post("/login", async (req, res) => {
  const usuariosBase = await Usuario.findAll({
    where: {
      usuario: req.body.usuario,
    },
  });
  console.log(usuariosBase);
  if (usuariosBase.length > 0) {
    const usuarioBase = usuariosBase[0]; // Obtén el primer usuario que coincida
    if (req.body.usuario === usuarioBase.usuario && req.body.password === usuarioBase.password) {
      const payload = {
        check: true,
      };
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
