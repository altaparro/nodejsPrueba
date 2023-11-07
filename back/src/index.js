// Donde inicia el sistema:

// ESTE IF SERIA PARA CUANDO PASA A PRODUCCION:
// if (process.env.NODE_ENV =! 'production'){
//     require('dotenv').config();
// }


require('dotenv').config();
const app = require("./app/app");

const port = process.env.PORT;

app.listen(port, ()=> {
    console.log(`-------- server corriendo en puerto ${port}`);
});