const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize("product_test", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

class Usuario extends Model {}

Usuario.init(
  {
    usuario_id: {
      type: DataTypes.INTEGER,
    //   defaultValue: DataTypes.UUIDV4, //autoincrementable generando un id codificado
      autoIncrement: true,
      primaryKey: true,
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false, // no puede ser nulo
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false, // no puede ser nulo
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // no puede ser nulo
    },
   
  },
  {
    sequelize,
    modelName: "Usuario",
  }
);

module.exports = Usuario;

// testeando la conexion:

  async function testConnection(){
    try {
        await sequelize.authenticate()
        console.log("conexion correcta");
      } catch (err) {
        console.error("algo salio mal", err);
      }
  }

  testConnection();