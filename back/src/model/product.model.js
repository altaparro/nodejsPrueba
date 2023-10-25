const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize("product_test", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

class Product extends Model {}

Product.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
    //   defaultValue: DataTypes.UUIDV4, //autoincrementable
      autoIncrement: true,
      primaryKey: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false, // no puede ser nulo
    },
    price: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: false,
    },
    is_stock: {
      type: DataTypes.BOOLEAN,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Product",
  }
);



module.exports = Product;

// testeando la conexion:

//   async function testConnection(){
//     try {
//         await sequelize.authenticate()
//         console.log("conexion correcta");
//       } catch (err) {
//         console.error("algo salio mal", err);
//       }
//   }

//   testConnection();
