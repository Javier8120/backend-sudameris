//Conexion con la base de datos mogodb..

const mongoose = require('mongoose')

URI=('mongodb://localhost:27017/banco-sudameris')  //Variable URI para conectar nuestra base de datos.//Mongoose se encarga de crearla en caso de que no exista. 
mongoose.connect(URI)
  .then(db=>console.log('Base de datos conectada'))
  .catch(error => console.log(error))


  //Finalmente exportamos...

  module.exports=mongoose