/* const http = require("./http")
const db = require("./database")

http.init();
db.init(); */

const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express   = require("express");
const cors = require("cors");
const morgan = require('morgan'); //llamamos a morgan
const { userRoutes } = require("./routes/userRoutes")
const { RegisterRoutes } = require("./routes/RegisterRoutes")
//cONFIGURACION VARIABLES DE ENTORNO
dotenv.config();
const config = {
  http: {
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || process.env.HTTP_PORT
  },
  dbString: process.env.DB_CONNECTION_STRING
};
const { host, port } = config.http;
const dbString = config.dbString;
  
const iniciarDb = async () => {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    try {
      await mongoose.connect(dbString, options); //'mongodb://localhost:27017/banco-sudameris'
      console.log("Connected to the databse sucessfully");
    } catch (error) {
      console.log(`Error message: ${error.message}`)
  
    }
  }

const iniciarServer = () => {
    app.listen(port, host, () => {
      console.log(`Server running on http://${host}:${port}`);
    })
  }




const app = express();
app.use(cors()); //Peticiones de otros dominios
app.use(express.json()) // lee archios json
app.use(morgan('dev')) // Ver peticiones que le hacen a nuestra api en consola.
app.get("/prueba", (req, res)=>{
    res.json(req.body)
});
app.use("/registros", RegisterRoutes);
app.use("/user", userRoutes);

//Iniciando bd y conexion con servidor
iniciarDb();
iniciarServer();

///Asignado Rutas 
