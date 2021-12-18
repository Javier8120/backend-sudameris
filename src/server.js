/// Servidor...
const express = require('express') // Llamamos express
const app = express() // A travez de la constante app accedemos a todo lo que tenga expres
const morgan = require('morgan') //llamamos a morgan
const cors = require('cors') //llamamos a cors
//const bodyparser = require('body-parser') // llamamos bodypaster. 
//Rutas Import
const { UserRoutes } = require("./routes/UserRoutes")
const { RegisterRoutes } = require("./routes/RegisterRoutes")
/* const { AdminRoutes } = require("./routes/AdminRoutes") */

// BD.
require('./database')
//Como se llama la peli: Las llamadas de los paquetes que necesitamos. 
app.set('Port', 4000) // Nuestro server correrar en el puerto 4000
app.use(cors()) //Middleware cors
app.use(express.json()); //Middleware para convertir a JSON
app.use(morgan('dev')) //Le decimos a la app que use morgan Y ESTO NOS LISTARA LAS PETICIONES QUE HAGAN A NUESTRO SERVIDOR..
//app.use(bodyparser.urlencoded({extended:true})) 

app.use("/registros", RegisterRoutes);
app.use("/user", UserRoutes);
//app.use(bodyparser.json())
//Rutas
//app.use('/api/',require('./routes/UserRoutes'))





//start server

app.listen(app.get('Port'), () =>{
    console.log ('Escuchando por el puerto', app.get('Port'))
})

//Configurando nodemon. 
//En package Json esta la linea de configuracion
//para nodemon. en Scripts... 