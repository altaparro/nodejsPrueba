// Configuracion de la bdd:

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("product_test", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

module.exports = sequelize;