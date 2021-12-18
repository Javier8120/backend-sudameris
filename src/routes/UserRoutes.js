const { Router } = require("express"); // seleccionar funcion Router de express
const UserRoutes = Router(); 
const { UserModel } = require("../models/AuthModels/UserModel")
const { compare } = require("bcrypt"); 
// bcryptjs (algoritmot criptografico para generar claves hash unidireccionales)

//captura de el usuario / password / Ruta

UserRoutes.post("/login",  async function(req, res) {

    const {email, password} = req.body // esto es una destructuracion (Quiere decir que el archivo puede tener muchas otras dunciones)
    
    //Buscar en la bd
   const user = await UserModel.findOne({ email })
    //Preguntar si existe el usuario
    if (!user){
        return res.status(401).send({estado: "error", msg: "Credenciales no validad"})
    }
    //comparar el password bcrypt (Siempre se especifica credenciales incorrecttr)    
    const passOk = await compare(password, user.password)
    if (passOk){
        return res.status(200).send({estado: "OK", msg: "Logueado en el sistema"})
    }
    return res.status(401).send({estado: "error", msg: "Credenciales no validad"})
    
})

exports.UserRoutes = UserRoutes