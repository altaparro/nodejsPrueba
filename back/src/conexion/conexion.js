// Configuracion de la bdd:
require('dotenv').config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.NOMBRE_BD, process.env.USUARIO_BD, process.env.PASS_BD, {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

module.exports = sequelize;