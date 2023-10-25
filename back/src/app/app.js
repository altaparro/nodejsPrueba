const express = require("express");

const morgan = require("morgan");

const productoRouter = require("../router/product.router");

const usuarioRouter = require("../router/usuario.router");

const Usuario = require("../model/usuario.model");

const app = express();

const cors = require("cors");

const jwt = require("jsonwebtoken");

const keys = require("../settings/keys");

const bcrypt = require("bcrypt");

app.use(cors());

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

// user: altaparro, pass: 123456

app.post("/login", async (req, res) => {
  if (!req.body.usuario.trim() || !req.body.password.trim()) {
    res.json({
      message: "Complete los campos.",
    });
  } else {
    const usuariosBase = await Usuario.findAll({
      where: {
        usuario: req.body.usuario,
      },
    });
    if (usuariosBase.length > 0) {
      const usuarioBase = usuariosBase[0];
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        usuarioBase.password
      );

      if (passwordMatch) {
        const userId = usuarioBase.usuario_id;
        const payload = {
          userId: userId,
          check: true,
        };
        const token = jwt.sign(payload, app.get("key"), {
          expiresIn: "30m",
        });
        res.json({
          message: "Autenticación exitosa",
          success: true,
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
  }
});

module.exports = app;
